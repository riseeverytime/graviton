import { element, style, render, lang } from '@mkenzo_8/puffin'
import WindowBody from '../components/window/window'
import WindowBackground from '../components/window/background'
import { LanguageState, getTranslation } from 'LanguageConfig'
import RunningConfig from 'RunningConfig'

const styleWrapper = style`
	&{
		min-height:100%;
		min-width:100%;
		position:fixed;
		top:50%;
		left:50%;
		transform:translate(-50%,-50%);
	}
`

function Window({ title = '', component: contentComponent, height = '75%', width = '80%' }) {
	const randomSelector = Math.random()
	const WindowComponent = element({
		components: {
			WindowBody,
			WindowBackground,
			contentComponent,
		},
		addons: [lang(LanguageState)],
	})`
		<div id="${randomSelector}" win-title="${title}" class="window ${styleWrapper}" methods="${{
		closeWindow,
	}}">
			<WindowBackground  closeWindow=${closeWindow}/>
			<WindowBody style="height:${() => height};width:${() => width};">
				<contentComponent/>
			</WindowBody>
		</div>
	`
	function launchWindow() {
		RunningConfig.data.openedWindows = RunningConfig.data.openedWindows + 1
		render(WindowComponent, document.getElementById('windows'))
	}
	function closeWindow() {
		if (document.getElementById(randomSelector)) {
			RunningConfig.data.openedWindows = RunningConfig.data.openedWindows - 1
			document.getElementById(randomSelector).remove()
		}
	}
	return {
		launch: () => {
			launchWindow(WindowComponent)
		},
		close: () => closeWindow(WindowComponent),
	}
}

export default Window
