import {puffin} from '@mkenzo_8/puffin'
import ThemeProvider from '../../utils/themeprovider'
import DropMenu from '../dropmenu'
import Buttons from './buttons'
import Logo from '../../../../assets/logo.svg'

const TitleBar = puffin.element(`
    <div>
        <div class="${puffin.style.css`
            ${ThemeProvider}
            &{
                padding:0px;
                display:flex;
                background:{{titlebarBackground}};
                max-height:40px;
                overflow:hidden;
            }
            & .title{
                -webkit-app-region: drag;
                flex:1;
                width:auto;
            }
            & .dropmenus{
                min-width:auto; 
                width:auto;
                overflow:hidden; 
                overflow-x:auto;
                display:flex;
            }
            & .buttons{
                max-width:auto;
                width:auto;
                display:flex;
            }
            .logo{
                width:27px;
                padding:9px;
            }
        `}">
            ${process.platform === "darwin"?'<Buttons/>':''}
            <img src="${Logo}" class="logo"/>
            <div id="dropmenus" class="dropmenus"></div>
            <div class="title"></div>
            ${process.platform === "darwin"?'':'<Buttons/>'}
        </div>
    </div>
`,{
    components:{
        DropMenu,
        Buttons
    }
})

export default TitleBar