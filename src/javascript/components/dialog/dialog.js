import { puffin } from '@mkenzo_8/puffin'

const DialogBody = new puffin.element(`
    <div class="${puffin.style.css`
        &{
            border:1px solid gray;
            width:200px;
            min-width:150px;
			width:20%;
            max-width: 300px;
            min-height: 15%;
            max-height: 32%;
            background: var(--windowBackground);
            border-radius: 7px;
            overflow:auto;
            position:absolute;
            padding:10px;
			display:flex;
			flex-direction:column;
        }
		& p {
			margin-top:15px;
		}
		& > div:nth-child(1){
            min-height:auto;	
			flex:1;
        }
        & > div:nth-child(2){
			min-height:auto;
            position:relative;
            bottom:0px;
            display:flex;
            justify-content:flex-end;
        }
        & button {
			max-height:auto;
			padding:8px 13px;
        }
    `}"/>
`)

export default DialogBody