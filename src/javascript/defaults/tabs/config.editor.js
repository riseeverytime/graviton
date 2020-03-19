import Tab from '../../constructors/tab'
import Editor from '../../constructors/editor'
import ExtensionsRegistry from 'ExtensionsRegistry'
import StaticConfig from 'StaticConfig'

function updateStaticConfigByKey(client,instance){
	const newConfig = JSON.parse(client.do('getValue',instance))
	Object.keys(StaticConfig.data).map((key)=>{
		StaticConfig.data[key] = newConfig[key]
	})
}

function updateKey(client,instance,state,key){
	const newConfig = JSON.parse(client.do('getValue',instance))
	if( newConfig[key] != state.data[key] ){
		const initialCursor = client.do('getCursorPosition',{instance})
		newConfig[key] = state.data[key]
		client.do('doChangeValue',{instance, value:JSON.stringify(newConfig,null,2)})
		client.do('doIndent',{instance}) 
		client.do('setCursorPosition',{instance,...initialCursor})
	}
}

function configEditor(){
	const { bodyElement, tabElement, tabState, isCancelled } = new Tab({
		title:'Configuration'
	})
	if( isCancelled ) return; //Cancels the tab opening
	const {client,instance} = new Editor({
		language:'json',
		value:JSON.stringify(StaticConfig.data,null,3),
		theme:ExtensionsRegistry.registry.data.list[StaticConfig.data.appTheme].textTheme,
		bodyElement,
		tabElement,
		tabState
	})
	const editorFontSizeWatcher = StaticConfig.keyChanged('editorFontSize',()=>{
		updateKey(client,instance,StaticConfig,'editorFontSize')
	})
	const appZoomWatcher = StaticConfig.keyChanged('appZoom',()=>{
		updateKey(client,instance,StaticConfig,'appZoom')
	})
	const tabWatcher = tabElement.props.state.on('destroyed',()=>{
		tabWatcher.cancel()
		editorFontSizeWatcher.cancel()
		appZoomWatcher.cancel()
	})
	client.do('doIndent',{instance}) //Force an initial indentation
	client.do('doFocus',{instance}) //Force an initial indentation
	tabState.emit('savedMe') //Save the tab
		
	tabElement.props.state.on('savedMe',()=>{
		updateStaticConfigByKey(client,instance)
	})
}
export default configEditor