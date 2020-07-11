import { element, style } from '@mkenzo_8/puffin'
import { Text } from '@mkenzo_8/puffin-drac'
import largeLogo from '../../../assets/large_logo.svg'
import RunningConfig from 'RunningConfig'

const styleWrapper = style`
	&{
		background:var(--splashScreenBackground, #191919);
		color:var(--splashScreenText);
		position:fixed;
		top:0;
		left:0;
		min-height:100%;
		min-width:100%;
		display:flex;
		justify-content:center;
		align-items:center;
		font-size:20px;
	}
	& img {
		width: 20%;
		max-width: 200px;
	}
`

function SplashScreen() {
	function mounted() {
		window.addEventListener('load', () => {
			RunningConfig.on('allPluginsLoaded', () => {
				console.log('%c 🎉 Loaded successfully. ', 'color:black; border-radius:10px; background:pink; padding:3px 8px; margin:5px 0px;')
				this.remove()
			})
		})
	}
	return element({
		components: {
			Text,
		},
	})`
		<div mounted="${mounted}" class="${styleWrapper}"">
			<img src="${largeLogo}"/>
		</div>
	`
}

export default SplashScreen
