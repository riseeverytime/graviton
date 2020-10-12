import { ipcMain, MenuItem, Menu } from 'electron'
import Store from './store_handler'

export default window => {
	const isWindows = (Store.get('config') as any).appPlatform === 'win32'
	let NativeMenuBar = null

	if (!isWindows) {
		NativeMenuBar = new Menu()
	}

	ipcMain.on('newMenuItem', (e, props) => {
		const obj = parse(props)
		NativeMenuBar.append(new MenuItem(obj))
		Menu.setApplicationMenu(NativeMenuBar)
	})

	ipcMain.on('destroy-menus', (e, props) => {
		NativeMenuBar.clear()
	})

	function parse(obj) {
		let id = obj.action
		obj.click = () => {
			window.webContents.send(`menu_${id}`)
		}
		if (obj.submenu) {
			obj.submenu.map(menu => {
				parse(menu)
			})
		}
		return obj
	}
}
