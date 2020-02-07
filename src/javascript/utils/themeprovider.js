import {puffin} from '@mkenzo_8/puffin'
import StaticConfig from 'StaticConfig'
import Arctic from '../themes/arctic'
import Night from '../themes/night'

StaticConfig.changed(function(){
    applyTheme(StaticConfig)
})

const ThemeProvider = new puffin.state({
    accentColor: "#0066FF",
    textColor:'black',
    bodyBackground:'rgb(238,238,238)',
    titlebarBackground:"rgb(238,238,238)",
    dropmenuBackground:'white',
    dropmenuButtonBackground:"rgb(238,238,238)",
    dropmenuButtonHoveringBackground:"rgb(212,212,212)",
    dropmenuButtonText:"black",
    dropmenuButtonHoveringText:"white",
    dropmenuOptionText:"black",
    dropmenuOptionHoveringText:"white",
    controlButtonsFill:"black",
    controlButtonsHoverBackground:"rgb(212,212,212)",
    controlCloseButtonHoverBackground:"rgba(232,17,35)",
    controlCloseButtonHoverFill:"white",
    windowBackground:'white',
    contextmenuBackground:'white',
    contextmenuButtonBackground:'white',
    contextmenuButtonText:'black',
    contextmenuButtonHoveringBackground:'#0066FF',
    contextmenuButtonHoveringText:'white',
    mainpanelBackground:'white',
    tabsbarBackground:'rgb(238,238,238)',
    tabText:'black',
    tabBackground:'transparent',
    tabActiveText:'black',
    tabActiveBackground:'white',
    scrollbarBackground:'rgba(0,0,0,0.2)',
    scrollbarHoverBackground:'rgba(0,0,0,0.5)',
    tabIconStroke:'black',
    tabIconHoverStroke:'gray',
    sidemenuBackground:'rgb(238,238,238)',
    sidemenuButtonBackground:'transparent',
    sidemenuButtonHoverBackground:'rgb(212,212,212)',
    sidemenuButtonActiveBackground:'#0066FF',
    sidemenuButtonText:'black',
    sidemenuButtonActiveText:'white',
    explorerItemText:'black',
    cardBackground:'rgb(238,238,238)',
    buttonBackground:'rgb(238,238,238)',
    radioBackgroundHovering:'#EFEFEF',
    radioCircleBackground:'white',
    radioCircleBorder:'#CFCFCF',
    windowBorder:'gray'
})

function applyTheme(state){
    switch(state.data.theme){
        case "Arctic":
            ThemeProvider.data = Arctic
        break;
        case "Night":
            ThemeProvider.data = Night
        break;
    }
    ThemeProvider.triggerChange()
}

applyTheme(StaticConfig)

export default ThemeProvider