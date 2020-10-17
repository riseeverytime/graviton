import { Shortcuts } from 'shortcuts'
import { Panel, removePanel } from '../constructors/panel'
import RunningConfig from 'RunningConfig'
import StaticConfig from 'StaticConfig'
import CommandPrompt from '../constructors/command.prompt'
import PluginsRegistry from 'PluginsRegistry'
import About from './dialogs/about'
import Languages from '../collections/languages'
import configEditor from './tabs/config.editor.js'
import Settings from './windows/settings'
import Welcome from './windows/welcome'
import Store from './windows/store'
import * as path from 'path'
import * as fs from 'fs-extra'
import Tab from '../constructors/tab'
import Editor from '../constructors/editor'
import normalizeDir from '../utils/directory_normalizer'
import getFormat from '../utils/format_parser'

//Command: Save current opened file if there is any (default: Ctrl+S)
RunningConfig.on('command.saveCurrentFile', () => {
	RunningConfig.data.focusedTab && RunningConfig.data.focusedTab.state.emit('savedMe')
})

//Command: Create a new panel (default: Ctrl+N)
RunningConfig.on('command.newPanel', () => {
	new Panel()
})

//Command: Close the current tab (default: Ctrl+T)
RunningConfig.on('command.closeCurrentTab', () => {
	if (RunningConfig.data.focusedTab) {
		//Check if there is any opened tab
		RunningConfig.data.focusedTab.state.emit('close')
	}
})

//Command: Try to close the current panel (default: Ctrl+L)
RunningConfig.on('command.closeCurrentPanel', () => {
	removePanel()
})

//Command: Open the global command prompt (default: Ctrl+P)
RunningConfig.on('command.openCommandPrompt', () => {
	new CommandPrompt({
		name: 'global',
		showInput: true,
		inputPlaceHolder: 'Enter a command',
		options: [
			{
				label: 'Open Settings',
				action: () => Settings().launch(),
			},
			{
				label: 'Open Projects',
				action: () => Welcome().launch(),
			},
			{
				label: 'Open Workspaces',
				action: () => {
					Welcome({
						defaultPage: 'workspaces',
					}).launch()
				},
			},
			{
				label: 'Open Store',
				action: () => Store().launch(),
			},
			{
				label: 'Open About',
				action: () => About().launch(),
			},
			{
				label: 'Open Manual Configuration',
				action: () => configEditor(),
			},
			{
				label: 'Set Theme',
				action: () => {
					const configuredTheme = StaticConfig.data.appTheme
					const registry = PluginsRegistry.registry.data.list
					new CommandPrompt({
						showInput: true,
						inputPlaceHolder: 'Select a theme',
						options: [
							...Object.keys(registry)
								.map(name => {
									const pluginInfo = registry[name]
									if (pluginInfo.type == 'theme') {
										return {
											label: name,
											selected: configuredTheme === name,
										}
									}
								})
								.filter(Boolean),
						],
						onSelected(res) {
							StaticConfig.data.appTheme = res.label
						},
						onScrolled(res) {
							StaticConfig.data.appTheme = res.label
						},
					})
				},
			},
			{
				label: 'Set zoom',
				action: () => {
					new CommandPrompt({
						showInput: false,
						options: [
							{
								label: 'Default',
								action() {
									StaticConfig.data.appZoom = 1
								},
							},
							{
								label: 'Increase',
								action() {
									StaticConfig.data.appZoom += 0.1
								},
							},
							{
								label: 'Decrease',
								action() {
									StaticConfig.data.appZoom -= 0.1
								},
							},
						],
					})
				},
			},
			{
				label: 'Set Language',
				action: () => {
					const configuredLanguage = StaticConfig.data.language
					new CommandPrompt({
						showInput: true,
						inputPlaceHolder: 'Select a language',
						options: [
							...Object.keys(Languages).map(lang => {
								const languageName = Languages[lang].name
								return {
									data: lang,
									label: languageName,
									selected: configuredLanguage === languageName,
								}
							}),
						],
						onSelected(res) {
							StaticConfig.data.appLanguage = res.data
						},
						onScrolled(res) {
							StaticConfig.data.appLanguage = res.data
						},
					})
				},
			},
			...RunningConfig.data.globalCommandPrompt,
		],
	})
})

//Command: Open the explorer command (default: Ctrl+O)
RunningConfig.on('command.openExplorerCommandPrompt', () => {
	const currentTab = RunningConfig.data.focusedTab
	const currentTabState = (currentTab && currentTab.state.data) || false
	const currentFileFolder = (currentTabState && currentTabState.parentFolder && `${path.normalize(currentTabState.parentFolder)}/`) || ''

	const showOptions = async (itemPath, setOptions) => {
		if (itemPath === '') return []

		const fileName = path.basename(itemPath)

		const itemExists = await fs.exists(itemPath)
		if (itemExists) {
			const itemData = await fs.lstat(itemPath)
			const isFolder = itemData.isDirectory()
			if (isFolder) {
				const items = await fs.readdir(itemPath)

				setOptions(
					items.map(label => {
						return {
							label,
							action() {
								//
							},
						}
					}),
				)
			}
		} else {
			const parentFolder = path.dirname(itemPath)
			const parentFolderItems = await fs.readdir(parentFolder)

			setOptions(
				parentFolderItems
					.map(label => {
						if (label.match(fileName)) {
							return {
								label,
								action() {
									//
								},
							}
						}
					})
					.filter(Boolean),
			)
		}
	}

	new CommandPrompt({
		name: 'explorer',
		showInput: true,
		inputDefaultText: currentFileFolder,
		inputPlaceHolder: "Enter a file's path",
		options: [],
		closeOnTab: false,
		onTabPressed: async ({ option, value: itemPath }, { setValue, setOptions }) => {
			let newItemPath
			fs.lstat(itemPath)
				.then(async () => {
					newItemPath = path.join(itemPath, option)
					const info = await fs.lstat(newItemPath)

					if (info.isDirectory()) {
						newItemPath = path.join(newItemPath, '/')
					}
				})
				.catch(async () => {
					const parentFolder = path.dirname(itemPath)
					newItemPath = path.join(parentFolder, option)

					const info = await fs.lstat(newItemPath)

					if (info.isDirectory()) {
						newItemPath = path.join(newItemPath, '/')
					}
				})
				.finally(() => {
					setValue(newItemPath)
					showOptions(newItemPath, setOptions)
				})
		},
		onWriting: async ({ value: itemPath }, { setOptions }) => {
			showOptions(itemPath, setOptions)
		},
		onCompleted: async filePath => {
			const fileExists = await fs.exists(filePath)

			if (fileExists) {
				RunningConfig.emit('loadFile', {
					filePath,
				})
			}
		},
	})
})

const focusCurrentEditor = () => RunningConfig.data.focusedEditor.client.do('doFocus', { instance: RunningConfig.data.focusedEditor.instance })
const currentEditorExists = () => RunningConfig.data.focusedEditor !== null

//Command: Open Editor command prompt (default: Ctrl+I)
RunningConfig.on('command.openEditorCommandPrompt', () => {
	new CommandPrompt({
		name: 'editor',
		showInput: true,
		inputPlaceHolder: 'Enter a command',
		options: [
			{
				label: 'Save',
				action: () => {
					if (!currentEditorExists()) return
					focusCurrentEditor()
					RunningConfig.emit('command.saveCurrentFile')
				},
			},
			{
				label: 'Close',
				action: () => {
					if (!currentEditorExists()) return
					focusCurrentEditor()
					RunningConfig.emit('command.closeCurrentTab')
				},
			},
			{
				label: 'Go to line',
				action: () => {
					if (!currentEditorExists()) return
					new CommandPrompt({
						name: 'go_to_line',
						showInput: true,
						inputPlaceHolder: '',
						options: [],
						onCompleted: data => {
							RunningConfig.data.focusedEditor.client.do('setCursorPosition', {
								instance: RunningConfig.data.focusedEditor.instance,
								line: Number(data),
								char: 1,
							})
							focusCurrentEditor()
						},
					})
				},
			},
			{
				label: 'Compare changes',
				action: async () => {
					const { isEditor, instance, directory } = RunningConfig.data.focusedTab.state.data
					if (isEditor) {
						const fileDir = normalizeDir(directory)
						const fileData = await fs.readFile(fileDir, 'UTF-8')
						const projectPath = instance.projectPath
						const relativePath = path.relative(projectPath, fileDir)

						const isGitRepo = await instance.explorerProvider.isGitRepo(projectPath)

						if (!isGitRepo) return //Return if the project is not a git repository

						const lastCommit = (await instance.explorerProvider.getGitFileLastCommit(projectPath, fileDir)).latest.hash
						const commitContent = await instance.explorerProvider.getGitFileContentByObject(projectPath, lastCommit, relativePath)
						const basename = path.basename(fileDir)
						const fileExtension = getFormat(fileDir)

						const { bodyElement, tabElement, tabState, isCancelled } = new Tab({
							title: `${basename}'s changes'`,
							isEditor: true,
							explorerProvider: instance.explorerPovider,
						})
						if (isCancelled) return //Cancels the tab opening

						new Editor({
							language: fileExtension,
							value: fileData,
							theme: PluginsRegistry.registry.data.list[StaticConfig.data.appTheme].textTheme,
							bodyElement,
							tabElement,
							tabState,
							directory: fileDir,
							options: {
								merge: true,
								mirror: commitContent,
							},
						})
					}
				},
			},
		],
	})
})

let openedTabsList = []

RunningConfig.on('aTabHasBeenCreated', ({ tabElement }) => {
	openedTabsList.push({
		element: tabElement,
		title: tabElement.state.data.title,
		icon: tabElement.children[0].src,
	})
})

RunningConfig.on('aTabHasBeenClosed', ({ tabElement }) => {
	openedTabsList.splice(getTabIndex(tabElement), 1)
})

const getTabIndex = element => {
	let i = null
	openedTabsList.find((tab, index) => {
		if (tab.element == element) i = index
	})
	return i
}
//Command: Open the tabs iterator (default: Ctrl+Tab)
RunningConfig.on('command.openCurrentPanelTabsIterator', () => {
	if (RunningConfig.data.focusedTab) {
		const focusedTabData = {
			element: RunningConfig.data.focusedTab,
			title: RunningConfig.data.focusedTab.state.data.title,
			icon: RunningConfig.data.focusedTab.children[0].src,
		}

		const focusedTabIndex = getTabIndex(RunningConfig.data.focusedTab)
		openedTabsList.splice(focusedTabIndex, 1)
		openedTabsList.unshift(focusedTabData)

		new CommandPrompt({
			name: 'tab_switcher',
			showInput: false,
			scrollOnTab: true,
			closeOnKeyUp: true,
			defaultOption: openedTabsList.length > 1 ? 1 : 0,
			options: [
				...openedTabsList.map(tab => {
					return {
						icon: tab.icon,
						data: tab.element,
						label: tab.title,
					}
				}),
			],
			onSelected(res) {
				const toFocusTab = openedTabsList.find(tab => {
					return tab.element == res.data
				})
				toFocusTab && toFocusTab.element.state.emit('focusedMe')
			},
		})
	}
})

//Command: Increase the font size of all text editors
RunningConfig.on('command.increaseFontSize', ({ factor = 2 } = { factor: 2 }) => {
	StaticConfig.data.editorFontSize = Number(StaticConfig.data.editorFontSize) + factor
})

//Command: Decrease the font size of all text editors
RunningConfig.on('command.decreaseFontSize', ({ factor = 2 } = { factor: 2 }) => {
	StaticConfig.data.editorFontSize = Number(StaticConfig.data.editorFontSize) - factor
})

//Command: Close the current Window/Dialog opened (default: Esc)
RunningConfig.on('command.closeCurrentWindow', () => {
	const windows = document.getElementById('windows').children
	const selectedWindow = windows[windows.length - 1]
	if (!selectedWindow) return
	const { methods } = selectedWindow.props
	if (windows.length == 0 || !methods) return
	if (methods.closeWindow) methods.closeWindow()
})

//Command: Close app
RunningConfig.on('command.closeApp', () => {
	RunningConfig.emit('checkAllTabsAreSaved', {
		whenContinue() {
			const electronWindow = remote.getCurrentWindow()
			electronWindow.close()
		},
	})
})

//Command: Focus the explorer panel (default: Ctrl+E)
RunningConfig.on('command.focusExplorerPanel', () => {
	if (RunningConfig.data.focusedExplorerItem) {
		//If there is a focused item
		RunningConfig.data.focusedExplorerItem.firstChild.focus()
	} else {
		document.getElementById('explorer_panel').firstChild.firstChild.focus()
	}
})

const appShortCuts = new Shortcuts()
appShortCuts.add([
	...StaticConfig.data.appShortcuts.SaveCurrentFile.combos.map(shortcut => {
		return {
			shortcut: shortcut,
			handler: event => RunningConfig.emit('command.saveCurrentFile'),
		}
	}),
	...StaticConfig.data.appShortcuts.NewPanel.combos.map(shortcut => {
		return {
			shortcut: shortcut,
			handler: event => RunningConfig.emit('command.newPanel'),
		}
	}),
	...StaticConfig.data.appShortcuts.CloseCurrentTab.combos.map(shortcut => {
		return {
			shortcut: shortcut,
			handler: event => RunningConfig.emit('command.closeCurrentTab'),
		}
	}),
	...StaticConfig.data.appShortcuts.CloseCurrentPanel.combos.map(shortcut => {
		return {
			shortcut: shortcut,
			handler: event => RunningConfig.emit('command.closeCurrentPanel'),
		}
	}),
	...StaticConfig.data.appShortcuts.OpenEditorCommandPrompt.combos.map(shortcut => {
		return {
			shortcut: shortcut,
			handler: event => RunningConfig.emit('command.openEditorCommandPrompt'),
		}
	}),
	...StaticConfig.data.appShortcuts.OpenExplorerCommandPrompt.combos.map(shortcut => {
		return {
			shortcut: shortcut,
			handler: event => RunningConfig.emit('command.openExplorerCommandPrompt'),
		}
	}),
	...StaticConfig.data.appShortcuts.OpenCommandPrompt.combos.map(shortcut => {
		return {
			shortcut: shortcut,
			handler: event => RunningConfig.emit('command.openCommandPrompt'),
		}
	}),
	...StaticConfig.data.appShortcuts.IterateCurrentPanelTabs.combos.map(shortcut => {
		return {
			shortcut: shortcut,
			handler: event => RunningConfig.emit('command.openCurrentPanelTabsIterator'),
		}
	}),
	...StaticConfig.data.appShortcuts.IncreaseEditorFontSize.combos.map(shortcut => {
		return {
			shortcut: shortcut,
			handler: event => RunningConfig.emit('command.increaseFontSize'),
		}
	}),
	...StaticConfig.data.appShortcuts.DecreaseEditorFontSize.combos.map(shortcut => {
		return {
			shortcut: shortcut,
			handler: event => RunningConfig.emit('command.decreaseFontSize'),
		}
	}),
	...StaticConfig.data.appShortcuts.CloseCurrentWindow.combos.map(shortcut => {
		return {
			shortcut: shortcut,
			handler: event => RunningConfig.emit('command.closeCurrentWindow'),
		}
	}),
	...StaticConfig.data.appShortcuts.CloseApp.combos.map(shortcut => {
		return {
			shortcut: shortcut,
			handler: event => RunningConfig.emit('command.closeApp'),
		}
	}),
	...StaticConfig.data.appShortcuts.FocusExplorerPanel.combos.map(shortcut => {
		return {
			shortcut: shortcut,
			handler: event => RunningConfig.emit('command.focusExplorerPanel'),
		}
	}),
])
