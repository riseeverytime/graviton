use serde::{Deserialize, Serialize};

#[derive(Clone, Debug, Serialize, Deserialize)]
pub struct LanguageServer {
    pub name: String,
    pub id: String,
    pub extension_id: String,
}
