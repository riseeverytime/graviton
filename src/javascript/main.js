//Renderer process
import { puffin } from '@mkenzo_8/puffin'
import TitleBar from './components/titlebar/titlebar'
import BootAnimation from './components/bootanimation'
import loadDefaultMenus from './defaults/menus'
import Welcome from './defaults/welcome'
import ThemeProvider from 'ThemeProvider'
import Resizer from './components/panel/resizer.horizontally'

import '../sass/codemirror.reset.scss'

const App = puffin.element(`
    <div class="${puffin.style.css`
        ${ThemeProvider}
        body{
            padding:0px;
            margin:0px;
        }
        @font-face {
            font-family: mainFont;
            src: url(Inter-Regular.woff2) format("woff2") ;
        }
        * {
            font-family: mainFont !important;
        }
        #body{
            display:flex;
            flex-direction:columns;
            height:calc(100% - 40px);
            background:{{bodyBackground}};
        }
        #sidepanel{
            background:{{bodyBackground}};
            padding:10px;
            min-width:50px;
            width:35%;
            max-height:100%;
            overflow:auto;
            float: left;
            left: 0;
            
        }
        #mainpanel{
            min-width:50px;
            display:flex;
            flex-direction:columns;
            min-width:50px;
            width:300px;
            flex:1;
            box-shadow:-2px 0px 6px rgba(0,0,0,0.2);
            border-top-left-radius:5px;
            background:{{mainpanelBackground}}
        }
        #windows{
            position:absolute;
            top:0;
            height:0;
            width:0;
            display:flex;
        }
        #windows > div {
            display:flex;
            align-items:center;
            justify-content:center;
        }
        #windows > div > div {
            flex:1;
        }
    `}">
        <TitleBar/>
        <div id="body">
            <div id="sidepanel">
                
            </div>
            <Resizer/>
            <div id="mainpanel">
            
            </div>
        </div>
        <div id="windows"></div>
        <BootAnimation/>
    </div>
`,{
    components:{
        TitleBar,
        BootAnimation,
        Resizer
    },
    events:{
        mounted(){
            window.addEventListener("load",function(){
                Welcome.launch()
            })
        }
    }
})

puffin.render(App,document.getElementById("App"),{
    removeContent:true
})

import Panel from './constructors/panel'

new Panel()

loadDefaultMenus()
