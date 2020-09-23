const fs = require('fs-extra')
import simpleGit from 'simple-git'
import normalizeDir from '../utils/directory.normalizer'
import { join } from 'path'
import RunningConfig from 'RunningConfig'

/*
	This provides a tiny later between the GUI and the filesystem.
	This is used to access, read and mofify the local filesystem.
*/

const LocalExplorer = {
	name: 'Local',
	listDir: async function (path: string) {
		return new Promise(async res => {
			const items = await fs.readdir(path)
			res(
				items
					.map((item: string) => {
						let error = null
						try {
							var isDirectory = fs.lstatSync(join(path, item)).isDirectory()
						} catch (err) {
							error = err
						}
						if (!error) {
							return {
								name: item,
								isFolder: isDirectory,
							}
						}
					})
					.filter(Boolean),
			)
		})
	},
	readFile: async function (path: string) {
		return fs.readFile(path, 'UTF-8')
	},
	writeFile: function (path: string, data: string) {
		return fs.writeFile(path, data, 'UTF-8')
	},
	renameDir: function (oldPath: string, newPath: string) {
		return fs.rename(oldPath, newPath)
	},
	info: function (path: string) {
		return fs.lstatSync(path)
	},
	isGitRepo: async function (path: string) {
		if (!RunningConfig.data.isGitInstalled) return false
		const repoPath = normalizeDir(path)
		const simpleInstance = simpleGit(repoPath)
		return simpleInstance.checkIsRepo()
	},
	getGitStatus(path: string) {
		const simpleInstance = simpleGit(path)
		return simpleInstance.status()
	},
	decorator: null,
}

export default LocalExplorer
