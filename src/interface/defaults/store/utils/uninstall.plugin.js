import * as path from 'path'
import StaticConfig from 'StaticConfig'
import normalizeDir from '../../../utils/directory_normalizer'
import { unloadPluginFromRegistry } from '../../../utils/plugin.loader'
const rimraf = window.require('rimraf')

function uninstallPlugin({ PATH, name }) {
	return new Promise((resolve, reject) => {
		rimraf(PATH, () => {
			unloadPluginFromRegistry(name)
			resolve()
		})
	})
}

export default uninstallPlugin
