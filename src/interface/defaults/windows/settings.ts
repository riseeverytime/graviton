import { element, style, render, lang } from '@mkenzo_8/puffin'
import { Titles } from '@mkenzo_8/puffin-drac'
import Window from '../../constructors/window'
import SideMenu from '../../components/window/side.menu'
import SideMenuSearcher from '../../components/window/side.menu.searcher'
import SideMenuPage from '../../components/window/side_menu_page'

import TopMenu from '../../components/window/top_menu'

import CustomizationScheme from '../settings/pages/customization'
import AdvancedScheme from '../settings/pages/advanced'
import ShortcutsScheme from '../settings/pages/shortcuts'
import LanguagesScheme from '../settings/pages/languages'
import AboutPage from '../settings/pages/about'

import getScheme from '../../utils/get_scheme'

import { WindowInstance } from 'Types/window'

export default function Settings(): WindowInstance {
	const SettinsgPage = getScheme(CustomizationScheme())
	const AdvancePage = () =>
		getScheme(
			AdvancedScheme({
				closeWindow: () => SettingsWindow.close(),
			}),
		)
	const ShortcutsPage = () => getScheme(ShortcutsScheme())
	const LanguagesPage = () => getScheme(LanguagesScheme())

	const SettingsWindow = new Window({
		title: 'settings',
		component: SettingsPage,
	})

	function SettingsPage() {
		return element({
			components: {
				H1: Titles.h1,
				SideMenu,
				SideMenuSearcher,
				SideMenuPage,
				TopMenu,
			},
		})`
			<SideMenu default="customization">
				<div>
					<H1 lang-string="windows.Settings.Settings"/>
					<SideMenuSearcher/>
					<label to="customization" lang-string="windows.Settings.Customization.Customization"/>
					<label to="advanced" lang-string="windows.Settings.Advanced.Advanced"/>
					<label to="shortcuts" lang-string="windows.Settings.Shortcuts.Shortcuts"/>
					<label to="languages" lang-string="windows.Settings.Languages"/>
					<label to="about" lang-string="windows.Settings.About.About"/>
				</div>
				<div>
					<div href="customization">${SettinsgPage}</div>
					<SideMenuPage href="advanced" component="${AdvancePage}"/>
					<SideMenuPage href="shortcuts" component="${ShortcutsPage}"/>
					<SideMenuPage href="languages" component="${LanguagesPage}"/>
					<SideMenuPage href="about" component="${AboutPage}"/>
				</div>
			</SideMenu>
		`
	}
	return SettingsWindow
}
