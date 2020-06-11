/* This is Arctic theme color scheme */

const Arctic = {
	name: 'Arctic',
	id: 'arctic',
	version: '1.0.0',
	author: 'Marc Espín',
	textTheme: 'arctic',
	type: 'theme',
	colorsScheme: {
		accent: {
			Color: '#0066FF',
		},
		text: {
			Color: 'black',
		},
		body: {
			Background: 'rgb(238,238,238)',
		},
		titlebar: {
			Background: 'rgb(238,238,238)',
		},
		menu: {
			Background: 'white',
			Button: {
				Background: 'rgb(238,238,238)',
				Hovering: {
					Background: 'rgb(212,212,212)',
					Text: 'black',
				},
				Text: 'black',
			},
			Option: {
				Text: 'black',
				Hovering: {
					Background: '#0066FF',
					Text: 'white',
				},
			},
			Divider: 'rgb(212,212,212)',
		},
		control: {
			Buttons: {
				Fill: 'black',
				Hovering: {
					Background: 'rgb(212,212,212)',
				},
			},
			Close: {
				Button: {
					Hovering: {
						Background: 'rgba(232,17,35)',
						Fill: 'white',
					},
					Active: {
						Background: 'rgba(241,112,122)',
						Fill: 'black',
					},
				},
			},
		},
		window: {
			Background: 'white',
			Icons: {
				Fill: 'rgb(40,40,40)',
			},
			Border: 'rgb(150,150,150)',
		},
		contextmenu: {
			Background: 'white',
			Button: {
				Background: 'white',
				Text: 'black',
				Hovering: {
					Background: '#0066FF',
					Text: 'white',
				},
			},
			Divider: 'rgb(212,212,212)',
		},
		mainpanel: {
			Background: 'white',
		},
		tabsbar: {
			Background: 'rgb(238,238,238)',
		},
		tab: {
			Text: 'black',
			Background: 'transparent',
			Active: {
				Text: 'black',
				Background: 'white',
			},
			Hovering: {
				While: {
					Dragging: {
						Background: 'rgb(250,250,250)',
					},
				},
			},
			Icon: {
				Fill: 'black',
				Hovering: {
					Fill: 'gray',
				},
			},
		},
		scrollbar: {
			Background: 'rgba(0,0,0,0.2)',
			Hovering: {
				Background: 'rgba(0,0,0,0.5)',
			},
		},
		sidemenu: {
			Background: 'rgb(238,238,238)',
			Button: {
				Background: 'transparent',
				Hovering: {
					Background: 'rgb(212,212,212)',
				},
				Active: {
					Background: '#0066FF',
					Text: 'white',
				},
				Text: 'black',
			},
			Searcher: {
				Background: 'white',
				Text: 'black',
			},
		},
		explorer: {
			Item: {
				Text: 'black',
				Hovering: {
					Background: 'rgba(150,150,150,0.6)',
				},
				Selected: {
					Background: 'rgba(150,150,150,0.3)',
				},
				Arrow: {
					Background: '#646464',
				},
				Git: {
					Modified: {
						Text: '#9F00AD',
						Indicator: '#9F00AD',
					},
					Not: {
						Added: {
							Text: '#0066FF',
							Indicator: '#0066FF',
						},
					},
					Indicator: {
						Text: 'white',
					},
				},
			},
		},
		card: {
			Background: 'rgb(238,238,238)',
		},
		button: {
			Background: 'rgb(238,238,238)',
			Important: {
				Background: '#0066FF',
				Text: 'white',
			},
		},
		radio: {
			Background: {
				Hovering: '#EFEFEF',
			},
			Circle: {
				Background: 'white',
				Border: '#CFCFCF',
			},
		},
		file: {
			Not: {
				Saved: {
					Indicator: 'black',
				},
			},
		},
		editor: {
			Dialog: {
				Background: 'white',
				Text: 'black',
			},
		},
		statusbar: {
			Background: '#0066FF',
			Border: 'white',
			Item: {
				Background: 'transparent',
				Hovering: {
					Background: 'rgb(255,255,255,0.1)',
					Text: 'white',
				},
				Important: {
					Background: '#FFAB09',
					Text: 'black',
				},
				Text: 'white',
				Icon: {
					Background: 'white',
				},
			},
			Git: {
				Item: {
					Text: 'white',
					Modified: {
						Text: 'lightgray',
					},
				},
			},
		},
		input: {
			Background: 'transparent',
			Text: 'black',
		},
		splash: {
			Screen: {
				Text: 'black',
				Background: 'white',
			},
		},
		command: {
			Prompt: {
				Input: {
					Background: 'white',
					Text: 'black',
					Border: '#0066FF',
				},
				Background: 'rgb(238,238,238)',
				Option: {
					Background: 'rgb(238,238,238)',
					Active: {
						Background: '#0066FF',
						Text: 'white',
					},
					Text: 'black',
				},
			},
		},
		notification: {
			Background: 'rgb(242,242,242)',
			Title: {
				Text: 'black',
			},
			Content: {
				Text: 'black',
			},
			Button: {
				Background: 'rgb(220,220,220)',
			},
		},
		panel: {
			Border: 'rgba(180,180,180)',
		},
		switch: {
			Background: 'rgb(220,220,220)',
			Indicator: {
				Activated: {
					Background: '#0066FF',
				},
				Desactivated: {
					Background: 'rgba(150,150,150,0.8)',
				},
			},
		},
		loader: {
			Background: 'black',
		},
		sidebar: {
			Icons: {
				Fill: 'rgb(90,90,90)',
				Active: {
					Fill: 'rgb(50,50,50)',
				},
				Hovering: {
					Fill: 'rgb(90,90,90)',
				},
			},
			Icon: {
				Background: 'transparent',
				Hovering: {
					Background: 'rgb(180,180,180)',
				},
				Active: {
					Background: 'rgb(210,210,210)',
				},
			},
			Background: 'white',
		},
	},
}
export default Arctic
