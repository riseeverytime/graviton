use deno_core::error::AnyError;
use deno_core::FsModuleLoader;
use deno_runtime::deno_broadcast_channel::InMemoryBroadcastChannel;
use deno_runtime::deno_web::BlobStore;
use deno_runtime::permissions::Permissions;
use deno_runtime::worker::{
    MainWorker,
    WorkerOptions,
};
use deno_runtime::BootstrapOptions;
use std::collections::HashMap;
use std::rc::Rc;
use std::sync::Arc;
use tokio::sync::mpsc;
use uuid::Uuid;

use gveditor_core_api::extensions::client::ExtensionClient;

use crate::{
    worker_extension,
    EventListeners,
};

// Load up the Graviton JavaScript api, aka, fancy wrapper over Deno.core.opSync/opAsync
static GRAVITON_DENO_API: &str =
    include_str!(concat!(env!("CARGO_MANIFEST_DIR"), "/src/graviton.js"));

// Launches a Deno runtime for the specified file, it also embeds the Graviton Deno API
pub async fn create_main_worker(
    main_path: &str,
    client: ExtensionClient,
    listeners: EventListeners,
) {
    let module_loader = Rc::new(FsModuleLoader);

    let create_web_worker_cb = Arc::new(|_| {
        todo!("Web workers are not supported");
    });
    let web_worker_preload_module_cb = Arc::new(|_| {
        todo!("Web workers are not supported");
    });

    let options = WorkerOptions {
        bootstrap: BootstrapOptions {
            apply_source_maps: false,
            args: vec![],
            cpu_count: 1,
            debug_flag: false,
            enable_testing_features: false,
            location: None,
            no_color: false,
            runtime_version: "0.0.0".to_string(),
            ts_version: "0.0.0".to_string(),
            unstable: false,
        },
        extensions: vec![worker_extension::new(client, listeners.clone())],
        unsafely_ignore_certificate_errors: None,
        root_cert_store: None,
        user_agent: "graviton".to_string(),
        seed: None,
        js_error_create_fn: None,
        web_worker_preload_module_cb,
        create_web_worker_cb,
        maybe_inspector_server: None,
        should_break_on_first_statement: false,
        module_loader,
        get_error_class_fn: Some(&get_error_class_name),
        origin_storage_dir: None,
        blob_store: BlobStore::default(),
        broadcast_channel: InMemoryBroadcastChannel::default(),
        shared_array_buffer_store: None,
        compiled_wasm_module_store: None,
    };

    let main_module = deno_core::resolve_path(main_path).unwrap();

    // Enable all permissions
    // TODO: it would be interesting to specify what permissions the extensions have, this would make them more secure too
    let permissions = Permissions::allow_all();

    let mut worker = MainWorker::bootstrap_from_options(main_module.clone(), permissions, options);

    let handle = worker.js_runtime.handle_scope().thread_safe_handle();
    let main_path = main_path.to_string();

    // Register an event listener on "unload" that will terminate the worker
    tokio::spawn(async move {
        listeners
            .lock()
            .await
            .try_insert("unload".to_string(), HashMap::new())
            .ok();

        let (s, mut r) = mpsc::channel(1);
        let s_id = Uuid::new_v4();

        listeners
            .lock()
            .await
            .get_mut("unload")
            .unwrap()
            .insert(s_id, s);

        // Wait for the unload event
        r.recv().await;

        tracing::info!("Unloaded Deno Extension from {}", main_path);

        //TODO: Clean up event listeners

        // Close the worker forcefully
        handle.terminate_execution();
    });

    // Load the Graviton namespace
    worker
        .execute_script("<graviton>", GRAVITON_DENO_API)
        .unwrap();

    // Load the extension's main module
    worker.execute_main_module(&main_module).await.ok();

    worker.run_event_loop(false).await.ok();
}

fn get_error_class_name(e: &AnyError) -> &'static str {
    deno_runtime::errors::get_error_class_name(e).unwrap_or("Error")
}
