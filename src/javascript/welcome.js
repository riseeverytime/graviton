/*
########################################
              MIT License

Copyright (c) 2019 Marc Espín Sanztor

License > https://github.com/Graviton-Code-Editor/Graviton-App/blob/master/LICENSE.md

#########################################
*/
const g_hideSetup = () => {
	document.getElementById("g_setup").remove();
	current_config.justInstalled = false;
	saveConfig();
}
let welcome_window;
function g_welcomePage(){
	welcome_window = new Window({
	id:"welcome_window",
	content:`
		<h2 class='window_title'>${current_config.language["Welcome"]}</h2> 
		<div class="flex">
			<div id="recent_projects" class="horizontal">
				<h2 >${current_config.language["RecentProjects"]}</h2>
			</div> 
			<div id="notes" class="horizontal">
				<h2 class='title2'>${current_config.language["Notes"]}</h2>
				<p> Current build: ${ g_version.date } </p> 
				<p> OS: ${graviton.currentOS()}</p> 
				<p class="link" onclick="graviton.dialogChangelog()">${current_config.language["Changelog"]}</p>
			</div>
		</div>
		<div class='welcomeButtons'>
			<button onclick='openFolder(); welcome_window.close();' id='open_folder_welcome' class=" button1 translate_word" idT="OpenFolder">${current_config.language["OpenFolder"]}</button> 
			<button onclick='welcome_window.close();' id='skip_welcome' class=" button1 translate_word" idT="Skip">${current_config.language["Skip"]}</button> 
		</div>`
	})
	welcome_window.launch()
	fs.readFile(logDir, 'utf8', function (err,data) {
	  if (err) return console.log(err);
	  const objectLog = JSON.parse(data);
	  for(i=0;i<objectLog.length; i++){
			const project = document.createElement("div");
			project.setAttribute("class","project_div");
			project.setAttribute("onclick",`loadDirs('${objectLog[i].Path.replace(/\\/g, "\\\\")}','g_directories','yes'); welcome_window.close();`);
			project.innerText=objectLog[i].Name;
			const description = document.createElement("p");
			description.innerText = objectLog[i].Path;
			description.setAttribute("style","font-size:12px;")
			project.appendChild(description);
			document.getElementById("recent_projects").appendChild(project);
		}
 	});
 if(error_showed == false) DeleteBoot(); //Delay to load all the config
}
function g_Setup(){
	for(i=0;i<languages.length+1;i++){
		if(i==languages.length){
			loadLanguage(languages[0]); //Load english in case Graviton doesn't support the system's language
		}else if(languages[i].g_l_a==navigator.language){
			loadLanguage(languages[i].g_l); //Load system language
		}
	}
	const all = document.createElement("div");
	all.setAttribute("id", "g_setup")
	all.innerHTML=`
	<div class="body_window_full">
		<div id="body_window_full">
		</div>
	</div>`;
	document.body.appendChild(all);
	FTGoPage("1");
	fs.writeFile(logDir, "[]", (err) => { }); //Delete old log
	if(error_showed == false) DeleteBoot();
}
function FTGoPage(number){
	switch(number){
		case "1":
			document.getElementById("body_window_full").innerHTML= `
				<h1 style="font-size:50px; text-align:center; " class="translate_word" idT="Languages">${current_config.language["Languages"]}</h1> 
				<div id='language_list'></div> 
				<button onclick='FTGoPage("2"); ' style=" position:fixed; right:5%; bottom: 5%;" class="button1 translate_word" idT="Continue">${current_config.language["Continue"]}</button>			`;
			for(i=0;i<languages.length; i++){
				const languageDiv = document.createElement("div");
				languageDiv.setAttribute("class","language_div");
				languageDiv.setAttribute("onclick","loadLanguage('"+languages[i]["g_l"]+"'); selectLang(this);");
				languageDiv.innerText=languages[i]["g_l"];
				if(languages[i]["g_l"] === current_config.language["g_l"]){
					selectLang(languageDiv);
				}
				document.getElementById("language_list").appendChild(languageDiv);
			}	
		break;
		case "2":
			document.getElementById("body_window_full").innerHTML= `
				<h1 style="font-size:50px;  text-align:center;" class="translate_word" idT="Welcome.TakeATheme" >${current_config.language["Welcome.TakeATheme"]}</h1> 
				<div id='theme_list' style="height:60%;"></div> 
				<button onclick='FTGoPage("1"); ' style=" position:fixed; left:5%; bottom: 5%;  " class='button1 translate_word' idT="Back">${current_config.language["Back"]}</button> 
				<button id="FROM_THEMES_CONTINUE" onclick='FTGoPage("3");' style=" position:fixed; right:5%; bottom: 5%;"  class="button1 disabled translate_word" idT="Continue">${current_config.language["Continue"]}</button> 
			`;
			for(i=0;i<themes.length; i++){
				const themeDiv = document.createElement("div");
				themeDiv.setAttribute("class","  theme_div_welcomePage ");
				themeDiv.setAttribute("onclick",`loadTheme('${i}'); selectTheme('2',this);`);
				themeDiv.innerText=themes[i].Name;
				const author = document.createElement("p");
				author.innerText =`Made by: ${ themes[i]["Author"]}`;
				author.setAttribute("style","font-size:15px")
				const description = document.createElement("p");
				description.innerText = themes[i]["Description"];
				description.setAttribute("style","font-size:13px; line-height:2px;");
				themeDiv.appendChild(author);
				themeDiv.appendChild(description);
				themeDiv.addEventListener("click", function(){
					document.getElementById("FROM_THEMES_CONTINUE").classList.remove("disabled") ;
				});
				if(themes[i]["Name"] === current_config.theme["Name"]){
					selectTheme("2",themeDiv);
				}
				document.getElementById("theme_list").appendChild(themeDiv);		
			}
		break;
		case "3":
			document.getElementById("body_window_full").innerHTML= `
				<h1 style="  font-size:30px; margin-top:100px;  text-align:center;" class="translate_word" idT="Welcome.ThanksForInstalling" >${current_config.language["Welcome.ThanksForInstalling"]+" "+ g_version.version }</h1> 
				<button onclick='g_hideSetup(); g_welcomePage();' style=" position:fixed;  right:5%; bottom: 5%;"  class="button1 translate_word" idT="Finish">${current_config.language["Finish"]}</button> 
				`;
		break;
	}
}