/*
########################################
              MIT License

Copyright (c) 2019 Marc Espin Sanz

License > https://github.com/Graviton-Code-Editor/Graviton-App/blob/master/LICENSE.md

#########################################
*/
"use strict";

const fallbackProperties = {
	'editor-background-color':'editorBackgroundColor',
	'white-black' : 'primaryText',
	'black-white' : 'secondaryText',
	'widget-color':'widgetColor',
	'buttons-roundness':'buttonsRoundness',
	'dropmenu-background-color':'dropmenuBackgroundColor',
	'dropmenu-span-color':'dropmenuSpanColor',
	'titleBar-icons-color':'titleBarIconsColor',
	'window-radius':'windowsRadius',
	"window-border-color":"windowsBorderColor",
	"notifications-background-color":"notificationsBackgroundColor",
	"notifications-window-radius":"notificationsRadius",
	"scroll-color":"scrollColor",
	"scroll-color-hover":"scrollColorHovering"
}

function setProperties(current_config) {
	const colors = themes[i]["colors"]; //Take the colors object inside the json file of the selected theme
	for (i = 0; i < Object.keys(colors).length; i++) {
		if (
			current_config.accentColorPreferences === "system" &&
			Object.keys(colors)[i] === "accentColor"
		) {
			try {
				document.documentElement.style.setProperty(
					"--accentColor",
					"#" + systemPreferences.getAccentColor()
				);
				document.documentElement.style.setProperty(
					"--accentDarkColor",
					tinycolor(systemPreferences.getAccentColor())
						.darken()
						.toString()
				);
				document.documentElement.style.setProperty(
					"--accentLightColor",
					tinycolor(systemPreferences.getAccentColor())
						.brighten()
						.toString()
				);
				i += 2;
			} catch {}
			continue;
		}
		if (
			(current_config.animationsPreferences === "desactivated" &&
				Object.keys(colors)[i] !== "scalation") ||
			current_config.animationsPreferences === "activated" ||
			Object.keys(colors)[i] !== "blur"
		) {
			document.documentElement.style.setProperty(
				`--${Object.keys(colors)[i]}`,
				colors[Object.keys(colors)[i]]
			); //Update the CSS variables
		}
	}
}


function filterColors(colors){
	Object.keys(colors).map(function(color){
		if(color in fallbackProperties) {
			colors[fallbackProperties[color]] = colors[color]
			delete colors[color]
		}
	})
}

module.exports = {
	setTheme: function(name) {
		if (graviton.getCurrentTheme() === name) return;
		for (i = 0; i < themes.length; i++) {
			if (themes[i]["name"] === name) {
				if (themeObject.type === "custom_theme") {
					Plugins.disableCSS(themeObject);
				}
				current_config["theme"] = themes[i].name;
				if (themes[i].type === "custom_theme") {
					themes[i].colors;
				}
				filterColors(themes[i].colors)
				Plugins.enableCSS(themes[i]);
				themeObject = themes[i];
				setProperties(current_config);
				const explorer_icons = document.getElementsByClassName(
					"explorer_file_icon"
				);
				for (i = 0; i < explorer_icons.length; i++) {
					const format = getFormat(
						explorer_icons[i].getAttribute("file")
					);
					explorer_icons[i].src = (function() {
						if (
							explorer_icons[i].getAttribute("elementType") ===
							"directory"
						) {
							return directories.getCustomIcon(
								explorer_icons[i].getAttribute("file"),
								explorer_icons[
									i
								].parentElement.parentElement.getAttribute(
									"opened"
								) === "false"
									? "close"
									: "open"
							);
						} else {
							if (
								themeObject.icons === undefined ||
								(themeObject.icons[format.lang] === undefined &&
									format.trust === true)
							) {
								return `src/icons/files/${format.lang}.svg`;
							} else {
								if (
									themeObject.icons[format.lang] ===
										undefined &&
									themeObject.icons[format.format] ===
										undefined
								) {
									return `src/icons/files/${format.lang}.svg`;
								}
								if (format.trust === true) {
									return path.join(
										plugins_folder,
										themeObject.name,
										themeObject.icons[format.lang]
									);
								} else {
									return path.join(
										plugins_folder,
										themeObject.name,
										themeObject.icons[format.format]
									);
								}
							}
						}
					})();
				}
				editors.forEach(current_editor => {
					if (
						current_editor.editor !== undefined &&
						current_editor.editor !== null
					) {
						current_editor.editor.setOption(
							"theme",
							themeObject["highlight"]
						);
					}
				});
				if (terminal != null) {
					terminal.xterm.setOption("theme", {
						background:
							themeObject.colors["editorBackgroundColor"],
						foreground: themeObject.colors["primaryText"],
						cursor: themeObject.colors["primaryText"],
						selection: themeObject.colors["scrollColor"]
					});
				}
				document.body.setAttribute("theme", themeObject.name);
				return;
			}
		}
	}
};
