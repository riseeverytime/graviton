const Application = require('spectron').Application
const assert = require('assert')
const electronPath = require('electron')
const path = require('path')

const App = new Application({
	path: electronPath,
	args: [path.join(__dirname, '..')]
})

App.start()

setTimeout(function() {
	describe('Application launch', function () {
		it('🏡 App started', function () {
			return App.client.getWindowCount().then(function (count) {
				return count > 1
			})
		})
		it('👋 Welcome window opened', function (done) {
			const windowsContainer = App.client.element("#windows")
			windowsContainer.elements(".window").getAttribute('win-title').then((title)=>{
				if(title == "welcome"){
					done()
				}
			})
		})
		it('👨‍🎓 App finished', function () {
			App.stop()
			return true
		})
	})
	run();
}, 13000);