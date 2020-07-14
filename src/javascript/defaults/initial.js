import { Panel, removePanel } from '../constructors/panel'
import { registryAllPlugins } from '../utils/plugin.loader'
import { element, style } from '@mkenzo_8/puffin'
import { openFolder, openFile } from '../utils/filesystem.ts'
import path from 'path'
import Menu from '../constructors/menu'
import Settings from './windows/settings'
import Store from './windows/store'
import Welcome from './windows/welcome'
import PluginsRegistry from 'PluginsRegistry'
import Arctic from '../../../themes/Arctic/package.json'
import Night from '../../../themes/Night/package.json'
import GravitonIconpack from '../../../iconpacks/Graviton/package.json'
import RunningConfig from 'RunningConfig'
import StaticConfig from 'StaticConfig'
import About from './dialogs/about'
import Languages from '../collections/languages.js'
import configEditor from './tabs/config.editor.js'
import ContextMenu from '../constructors/contextmenu'
import Notification from '../constructors/notification'
import Dialog from '../constructors/dialog'
import gravitonHasUpdate from './store/utils/app.update'
import Explorer from '../constructors/explorer'
import SidePanel from '../constructors/side.panel'
import Play from '../components/icons/play'
import EnvClient from '../constructors/env.client'
import packageJSON from '../../../package.json'
import openDebugClient from './debug.window'
import './environment.inspectors/npm'
import './project.services/node'
import './side.panels/files.explorer'
import './side.panels/env.explorer'
import './shortcuts'
import './status.bar.items/tab.size'
import './status.bar.items/git'
import './status.bar.items/zoom'
import './status.bar.items/debug'

import '../collections/codemirror'

import '../../../node_modules/codemirror/mode/javascript/javascript'

const fs = window.require('fs-extra')
const { openExternal: openLink } = window.require('electron').shell
const { getCurrentWindow } = window.require('electron').remote

function init() {
	new Menu({
		//FILE
		button: 'menus.File.File',
		list: [
			{
				label: 'menus.File.OpenFile',
				action: () => {
					openFile().then(function (filePath) {
						RunningConfig.emit('loadFile', {
							filePath,
						})
					})
				},
			},
			{
				label: 'menus.File.OpenFolder',
				action: () => {
					openFolder().then(function (folderPath) {
						RunningConfig.emit('addFolderToRunningWorkspace', {
							folderPath,
							replaceOldExplorer: true,
							workspacePath: null,
						})
					})
				},
			},
			{},
			{
				label: 'menus.File.Projects.Projects',
				list: [
					{
						label: 'menus.File.Projects.OpenProjects',
						action: () => {
							Welcome().launch()
						},
					},
				],
			},
			{
				label: 'menus.File.Workspaces.Workspaces',
				list: [
					{
						label: 'menus.File.Workspaces.OpenWorkspaces',
						action: () => {
							Welcome({
								defaultPage: 'workspaces',
							}).launch()
						},
					},
					{},
					{
						label: 'menus.File.Workspaces.OpenFromFile',
						action: () => {
							RunningConfig.emit('openWorkspaceDialog')
						},
					},
					{
						label: 'menus.File.Workspaces.AddFolderToWorkspace',
						action: () => {
							RunningConfig.emit('addFolderToRunningWorkspaceDialog', {
								replaceOldExplorer: false,
							})
						},
					},
					{
						label: 'menus.File.Workspaces.SaveWorkspace',
						action: () => {
							RunningConfig.emit('saveCurrentWorkspace')
						},
					},
				],
			},
		],
	})
	new Menu({
		//EDIT
		button: 'menus.Edit.Edit',
		list: [
			{
				label: 'menus.Edit.Undo',
				action: () => {
					if (!RunningConfig.data.focusedEditor) return
					const { client, instance } = RunningConfig.data.focusedEditor
					client.do('executeUndo', {
						instance,
					})
				},
			},
			{
				label: 'menus.Edit.Redo',
				action: () => {
					if (!RunningConfig.data.focusedEditor) return
					const { client, instance } = RunningConfig.data.focusedEditor
					client.do('executeRedo', {
						instance,
					})
				},
			},
			{},
			{
				label: 'menus.Edit.FontSize.FontSize',
				list: [
					{
						label: 'menus.Edit.FontSize.Increase',
						action: () => {
							RunningConfig.emit('command.increaseFontSize')
						},
					},
					{
						label: 'menus.Edit.FontSize.Decrease',
						action: () => {
							RunningConfig.emit('command.decreaseFontSize')
						},
					},
				],
			},
			{},
			{
				label: 'menus.Edit.Find',
				action: () => {
					if (!RunningConfig.data.focusedEditor) return
					const { client, instance } = RunningConfig.data.focusedEditor
					client.do('openFind', {
						instance,
					})
				},
			},
			{
				label: 'menus.Edit.Replace',
				action: () => {
					if (!RunningConfig.data.focusedEditor) return
					const { client, instance } = RunningConfig.data.focusedEditor
					client.do('openReplace', {
						instance,
					})
				},
			},
			{},
			{
				label: 'menus.Edit.FormatDocument',
				action: () => {
					if (!RunningConfig.data.focusedEditor) return
					const { client, instance } = RunningConfig.data.focusedEditor
					client.do('doIndent', {
						instance,
					})
				},
			},
		],
	})
	new Menu({
		//TOOLS
		button: 'menus.Tools.Tools',
		list: [
			{
				label: 'menus.Tools.OpenSettings',
				action: () => Settings().launch(),
			},
			{
				label: 'menus.Tools.OpenStore',
				action: () => Store().launch(),
			},
			{},
			{
				label: 'menus.Tools.Panels.Panels',
				list: [
					{
						label: 'menus.Tools.Panels.NewPanel',
						action: () => RunningConfig.emit('command.newPanel'),
					},
					{
						label: 'menus.Tools.Panels.CloseCurrentPanel',
						action: () => RunningConfig.emit('command.closeCurrentPanel'),
					},
				],
			},
		],
	})
	new Menu({
		//VIEW
		button: 'menus.View.View',
		list: [
			{
				label: 'menus.View.ToggleSidebar',
				action: () => (StaticConfig.data.appEnableSidebar = !StaticConfig.data.appEnableSidebar),
			},
			{
				label: 'menus.View.ToggleSidepanel',
				action: () => (StaticConfig.data.appEnableSidepanel = !StaticConfig.data.appEnableSidepanel),
			},
		],
	})
	new Menu({
		//Window
		button: 'menus.Window.Window',
		list: [
			{
				label: 'menus.Window.Zoom.Zoom',
				list: [
					{
						label: 'menus.Window.Zoom.DefaultZoom',
						action: () => {
							StaticConfig.data.appZoom = 1
						},
					},
					{
						label: 'menus.Window.Zoom.IncreaseZoom',
						action: () => {
							StaticConfig.data.appZoom += 0.1
						},
					},
					{
						label: 'menus.Window.Zoom.DecreaseZoom',
						action: () => {
							StaticConfig.data.appZoom -= 0.1
						},
					},
				],
			},
			{},
			{
				label: 'menus.Window.Debug.Debug',
				list: [
					{
						label: 'menus.Window.Debug.OpenDebugWindow',
						action: () => openDebugClient(),
					},
				],
			},
			{},
			{
				label: 'menus.Window.OpenDevTools',
				action: () => getCurrentWindow().toggleDevTools(),
			},
		],
	})
	new Menu({
		//HELP
		button: 'menus.Help.Help',
		list: [
			{
				label: 'menus.Help.Contact',
				list: [
					{
						label: 'Github',
						action: () => {
							openLink('https://github.com/marc2332')
						},
					},
				],
			},
			{
				label: 'menus.Help.Social',
				list: [
					{
						label: 'Telegram',
						action: () => {
							openLink('https://t.me/gravitoneditor')
						},
					},
					{
						label: 'Discord',
						action: () => {
							openLink('https://discord.gg/gg6CTYA')
						},
					},
				],
			},
			{},
			{
				label: 'menus.Help.Contributors',
				list: (() => {
					return packageJSON.contributors.map(({ name, url }) => {
						return {
							label: name,
							action() {
								openLink(url)
							},
						}
					})
				})(),
			},
			{
				label: 'menus.Help.Blog',
				action: () => {
					openLink('https://graviton.netlify.app/blog/')
				},
			},
			{
				label: 'menus.Help.Documentation',
				action: () => {
					openLink('https://github.com/Graviton-Code-Editor/Graviton-App/wiki')
				},
			},
			{
				label: 'menus.Help.Website',
				action: () => {
					openLink('https://graviton.netlify.app/')
				},
			},
			{
				label: 'menus.Help.SourceCode',
				action: () => {
					openLink('https://github.com/Graviton-Code-Editor/Graviton-App')
				},
			},
			{},
			{
				label: 'menus.Help.CheckForUpdates',
				action() {
					checkForUpdates(() => {
						new Notification({
							title: 'No updates found',
						})
					})
				},
			},
			{
				label: 'menus.Help.About',
				action() {
					About().launch()
				},
			},
		],
	})
	if (RunningConfig.data.isDev) {
		new Menu({
			//HELP
			button: 'Dev',
			list: [
				{
					label: 'Notification test',
					action: () => {
						new Notification({
							title: 'Notification',
							content: 'Notification body',
							buttons: [
								{
									label: 'Button 1',
									action() {
										console.log('Clicked button 1')
									},
								},
								{
									label: 'Button 2',
									action() {
										console.log('Clicked button 2')
									},
								},
							],
						})
					},
				},
				{
					label: 'Dialog test',
					action: () => {
						const testDialog = new Dialog({
							title: 'Title',
							content: 'Dialog body',
							buttons: [
								{
									label: 'Button 1',
									action() {
										console.log('Clicked button 1')
									},
								},
								{
									label: 'Button 2',
									action() {
										console.log('Clicked button 2')
									},
								},
							],
						})
						testDialog.launch()
					},
				},
				{
					label: 'Env client test',
					action() {
						new EnvClient({
							name: 'Test',
						})
					},
				},
			],
		})
	}
	new Panel() //Initial Panel
	PluginsRegistry.add(Arctic)
	PluginsRegistry.add(Night)
	PluginsRegistry.add({
		PATH: path.join(__dirname, '../../../Graviton'),
		...GravitonIconpack,
	})

	RunningConfig.emit('appLoaded')

	StaticConfig.data.appCheckUpdatesInStartup && checkForUpdates()

	if (RunningConfig.data.isDebug === false && RunningConfig.data.arguments[0] && !RunningConfig.data.isDev) {
		const dir = RunningConfig.data.arguments[0]
		if (fs.existsSync(dir)) {
			if (fs.lstatSync(dir).isDirectory()) {
				RunningConfig.emit('addFolderToRunningWorkspace', {
					folderPath: RunningConfig.data.arguments[0],
					replaceOldExplorer: true,
					workspacePath: null,
				})
			} else {
				RunningConfig.emit('loadFile', {
					filePath: RunningConfig.data.arguments[0],
				})
			}
		}
	}
}

function checkForUpdates(ifNoUpdate) {
	if (RunningConfig.data.isDev) return
	gravitonHasUpdate()
		.then(({ res, version }) => {
			if (res) {
				new Notification({
					title: 'Update available',
					content: `Version ${version} is available`,
					buttons: [
						{
							label: 'misc.Update',
							action() {
								openLink('https://github.com/Graviton-Code-Editor/Graviton-App/releases')
							},
						},
						{
							label: 'misc.Ignore',
						},
					],
				})
			} else {
				ifNoUpdate && ifNoUpdate()
			}
		})
		.catch(err => {
			console.log('Couldnt fetch updates.')
		})
}

export default init
