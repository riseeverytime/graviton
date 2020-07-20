import PanelBody from '../components/panel/panel'
import { element, render } from '@mkenzo_8/puffin'
import RunningConfig from 'RunningConfig'
import ContextMenu from './contextmenu'
import tabsUnsavedWarningDialog from '../defaults/dialogs/tabs.unsaved.warning'

function guessTabPosition(tab, tabsbar) {
	const res = Object.keys(tabsbar.children).find((tabChildren, index) => {
		if (tabsbar.children[tabChildren] === tab) {
			return tabChildren
		}
	})
	return Number(res)
}

function Panel() {
	const randomSelector = Math.random()
	const PanelComp = element({
		components: {
			PanelBody,
		},
	})`
		<PanelBody id="${randomSelector}" :click="${focusPanel}">    
			<div :dragover="${allowDrop}" :drop="${onTabDropped}" class="tabsbar"/>
			<div :contextmenu="${contextmenu}"/>
		</PanelBody>
	`
	function allowDrop(e) {
		e.preventDefault()
	}
	function onTabDropped(e) {
		const target = document.getElementsByClassName(e.target.getAttribute('classSelector'))[0] || e.target
		const movingTab = document.getElementsByClassName(e.dataTransfer.getData('classSelector'))[0]
		const nextOldTab = document.getElementsByClassName(e.dataTransfer.getData('classSelectorForNext'))[0]
		let nextTab = null
		let tabsBar = null
		let oldPanel = movingTab.state.data.panel
		let panel = null
		let position = 0
		if (target.classList.contains('tabsbar')) {
			tabsBar = target
			position = tabsBar.children.length - 1
			panel = tabsBar.parentElement
		} else if (target.parentElement.classList.contains('tabsbar')) {
			tabsBar = target.parentElement
			panel = tabsBar.parentElement
			const targetPosition = guessTabPosition(target, tabsBar)
			const draggingTabPosition = guessTabPosition(movingTab, tabsBar)
			if (targetPosition < draggingTabPosition) {
				nextTab = tabsBar.children[targetPosition]
			} else {
				nextTab = tabsBar.children[targetPosition + 1]
			}
		}
		if (!tabsBar) return //Something went wrong
		if (position === tabsBar.children.length - 1) {
			tabsBar.appendChild(movingTab) //Drag targeting the tabs bar
		} else {
			tabsBar.insertBefore(movingTab, nextTab) //Drag between tabs
		}
		movingTab.state.emit('changePanel', panel) //Make dragged tab the active one in the new panel and also move the editor
		if (oldPanel !== panel && nextOldTab) {
			nextOldTab.state.emit('focusedMe') //Focus a tab in old panel
		}
		movingTab.state.emit('focusedMe', {}) //Focus the new tab
	}
	function focusPanel() {
		RunningConfig.data.focusedPanel = this
	}
	function contextmenu(event) {
		new ContextMenu({
			list: [
				{
					label: 'misc.Close',
					action: () => {
						removePanel(this.parentElement)
					},
				},
			],
			event,
			parent: this.parentElement,
		})
	}

	render(PanelComp, document.getElementById('mainpanel'))
	RunningConfig.data.focusedPanel = document.getElementById(randomSelector)

	return {
		element: document.getElementById(randomSelector),
	}
}

function focusOtherPanel(currentPanel) {
	const panelParent = currentPanel.parentElement
	const parentChildren = panelParent.children
	const position = (() => {
		for (let panelIndex = 0; panelIndex < parentChildren.length; panelIndex++) {
			if (parentChildren[panelIndex] == currentPanel) return panelIndex
		}
	})()
	if (parentChildren.length !== 1) {
		if (position === 0) {
			if (parentChildren.length > 1) {
				RunningConfig.data.focusedPanel = parentChildren[position + 1]
				return {
					oldPanel: currentPanel,
				}
			} else {
				RunningConfig.data.focusedEditor = null
				return {
					oldPanel: null,
				}
			}
		} else {
			RunningConfig.data.focusedPanel = parentChildren[position - 1]
			return {
				oldPanel: currentPanel,
			}
		}
	}
	return {
		oldPanel: null,
	}
}

function removePanel(panelToRemove = RunningConfig.data.focusedPanel) {
	if (getUnsavedtabs(panelToRemove).length == 0) {
		const { oldPanel } = focusOtherPanel(panelToRemove)
		if (oldPanel) {
			destroyTabs(oldPanel)
			oldPanel.remove()
		}
	}
}

function destroyTabs(panel) {
	const tabsBar = panel.children[0]
	const panelTabs = tabsBar.childNodes
	panelTabs.forEach(function (tab) {
		tab.state.emit('close')
	})
}

function getUnsavedtabs(panel) {
	const tabsBar = panel.children[0]
	const panelTabs = tabsBar.children
	const unSavedTabs = Object.keys(panelTabs).filter(n => {
		const tab = panelTabs[n]
		return tab.state.data.saved == false
	})
	return unSavedTabs
}

RunningConfig.on('checkAllTabsAreSaved', ({ whenContinue = function () {}, whenIgnore = function () {} } = {}) => {
	const panels = document.getElementById('mainpanel').children
	const allUnsavedTabs = Object.keys(panels)
		.map(n => {
			const panel = panels[n]
			return getUnsavedtabs(panel)
		})
		.flat()
	if (allUnsavedTabs.length != 0) {
		tabsUnsavedWarningDialog()
			.then(() => {
				whenContinue()
			})
			.catch(() => {
				whenIgnore()
			})
	} else {
		whenContinue()
	}
})

export { Panel, removePanel }
