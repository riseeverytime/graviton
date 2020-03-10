import { puffin } from '@mkenzo_8/puffin'
import requirePath from '../utils/require'
import Item from '../components/explorer/item'
import parseDirectory from '../utils/directory.parser'
import RunningConfig from 'RunningConfig'
import StaticConfig from 'StaticConfig'
import Notification from './notification'
import "babel-polyfill";

const fs = requirePath('fs-extra')
const simpleGit = requirePath("simple-git")
const chokidar = requirePath('chokidar');
const path = requirePath('path');

function checkIfProjectIsGit(path){
	const simpleInstance = simpleGit(path)
	return new Promise((resolve,reject)=>{
		simpleInstance.checkIsRepo((err,res)=>{
			if(!err) {
				resolve(res)
			}else{
				reject(err)
			}
		})
	})
}

function getStatus(path){
	const simpleInstance = simpleGit(path)
	return new Promise((resolve,reject)=>{
		simpleInstance.status((err,res)=>{
			resolve(res)
		}) 
	})
}

function createWatcher(folderPath,explorerState){
	const watcher = chokidar.watch(folderPath, {
		ignored: /(.git)|(node_modules)|(dist)|(.cache)/g,
		persistent: true,
		interval: 250,
		ignoreInitial: true
	});
	watcher
		.on('add', filePath => {
			explorerState.emit('newFile',{
				folderPath:path.dirname(filePath),
				fileName:path.basename(filePath)
			})
		})
		.on('change', filePath => explorerState.emit('changedFile',{filePath}))
		.on('unlink', filePath => explorerState.emit('removedFile',{filePath}))
		.on('addDir', folderPath => explorerState.emit('newFolder',{
			folderPath:path.dirname(folderPath),
			folderName:path.basename(folderPath)
		}))
		.on('unlinkDir', folderPath => explorerState.emit('removedFolder',{folderPath}))
	return watcher
}

function standarizePath(dir){
	return path.normalize(dir).replace(/\\/gi,"//")
}

async function Explorer(folderPath,parent,level = 0,replaceOldExplorer=true,gitChanges=null){
	if(level == 0){
		let gitResult = await checkIfProjectIsGit(folderPath)
		if( gitResult ) gitChanges = await getStatus(folderPath)
		const explorerContainer = puffin.element(`
		<Item id="${standarizePath(folderPath)}" isDirectory="true" parentFolder="${folderPath}" path="${parseDirectory(folderPath)}" fullpath="${folderPath}" level="0"/>
		`,{
			components:{
				Item:Item()
			},
			events:{
				mounted(){
					const explorerState = this.state
					let watcher = null;
					explorerState.emit('doReload')
					this.gitChanges = gitChanges
					RunningConfig.on(['aTabHasBeenUnSaved','aTabHasBeenSaved','aFileHasBeenCreated','aFolderHasBeenCreated'],async ({parentFolder})=>{
						if( gitResult && parentFolder == folderPath) {
							RunningConfig.emit('gitStatusUpdated',{
								gitChanges : await getStatus(folderPath),
								parentFolder
							})
						}
					})
					/*
					* The filesystem watcher is only ignoring node_modules, .git,dist and .cache folders for now.
					*/
					explorerState.on('stopedWatcher',()=>{
						if( watcher != null ){
							watcher.close();
							watcher = null;
						}
					})
					explorerState.on('startedWatcher',()=>{
						if( watcher == null ){
							watcher = createWatcher(folderPath,explorerState)
						}
					})
					StaticConfig.on('stopWatchers',()=>{
						explorerState.emit('stopedWatcher')
						StaticConfig.data.enableFileSystemWatcher = false
					})
					StaticConfig.on('startWatchers',()=>{
						explorerState.emit('startedWatcher')
						StaticConfig.data.enableFileSystemWatcher = true
					})
					if( StaticConfig.data.enableFileSystemWatcher ){
						explorerState.emit('startedWatcher')
					}
					explorerState.on('createItem',({container,folderPath,filePath,folderName,level,fileName,isFolder = false})=>{ 
						if( container == null) return; //Folder is not opened
						const possibleClass = standarizePath(filePath)
						if(document.getElementsByClassName(possibleClass)[0] == null){ //Might have been already created by watcher
							if( isFolder ){
								RunningConfig.emit('aFolderHasBeenCreated',{
									parentFolder:container.getAttribute("parentFolder"),
									path:filePath
								})
							}else{
								RunningConfig.emit('aFileHasBeenCreated',{
									parentFolder:container.getAttribute("parentFolder"),
									path:filePath
								})
							}
							const hotItem = puffin.element(`
									<Item class="${possibleClass}" isDirectory="${isFolder}" parentFolder="${container.getAttribute("parentFolder")}" path="${isFolder?folderName:fileName}" fullpath="${filePath}" level="${level}"/>
								`,{
									components:{
										Item:new Item()
									}
								})
								if( container.children[1] != null){
									puffin.render(hotItem,container.children[1])
								}
						}
					})
				}
			}
		})
		if(replaceOldExplorer && parent.children[0] != null){
			for( let otherExplorer of parent.children){
				RunningConfig.emit('removeFolderFromRunningWorkspace',{
					folderPath:otherExplorer.getAttribute("fullpath")
				})
			}
		}
		puffin.render(explorerContainer,parent,{
			removeContent:replaceOldExplorer
		})
	}
	fs.readdir(folderPath).then(function(paths){
		const explorerComponent = puffin.element(`
			<div style="padding:0px 7px;">
			${(function(){
						let content = "";
						paths.map(function(dir){ //Load folders 
							if(fs.lstatSync(path.join(folderPath,dir)).isDirectory()){
								content += `<Item class="${standarizePath(folderPath)}" isDirectory="true" parentFolder="${parent.getAttribute("parentFolder")}" path="${dir}" fullpath="${path.join(folderPath,dir)}" level="${level}"/>` 
							}
						})
						paths.map(function(dir){ //Load files 
							if(!fs.lstatSync(path.join(folderPath,dir)).isDirectory()){
								if(! dir.match("~") )
									content += `<Item class="${standarizePath(folderPath)}" isDirectory="false" parentFolder="${parent.getAttribute("parentFolder")}" path="${dir}" fullpath="${path.join(folderPath,dir)}" level="${level}"/>` 
							}
						})
						return content
					})()}
			</div>
	`,{
			components:{
				Item:Item()
			},
			events:{
				mounted(){
					this.gitChanges = gitChanges
				}
			}
		})
		if(level != 0){
			puffin.render(explorerComponent,parent,{
				removeContent:false
			})
		}
	}).catch(err=>{
		console.log(err)
		new Notification({
			title:'Error',
			content:err
		})
	})    
}

export default Explorer