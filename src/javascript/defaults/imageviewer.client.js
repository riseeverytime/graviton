import { EditorClient } from '../constructors/editorclient'
import { element, style, render } from '@mkenzo_8/puffin'

const styleWrapper = style`
	&{
		display:flex;
		justify-content:center;
		align-items:center;
		height:100%;
		margin:auto 0;
		width:100%;
	}
	& > img{
		width:auto;
		height:auto;
		max-height:87%;
		max-width:87%;
	}
`

const ImageViewerClient = new EditorClient(
	{
		name: 'codemirror',
	},
	{
		getValue: instance => '',
		getLangFromExt(extension) {
			switch (extension) {
				/*
			Every case refers to a supported image format.
			*/
				case 'ico':
					return {
						name: 'ico',
					}
				case 'svg':
					return {
						name: 'svg',
					}
				case 'png':
					return {
						name: 'png',
					}
				case 'jpg':
					return {
						name: 'jpg',
					}
				default:
					return {
						name: extension,
						unknown: true,
					}
			}
		},
		create({ element: containerElement, directory }) {
			const ImageViewerComp = element`
			<div class="${styleWrapper}">
				<img draggable="false" src="${directory}"/>
			</div>
		`
			render(ImageViewerComp, containerElement)
			return {
				instance: {}, //Returns empty object because there is no editor instance
			}
		},
		getCursorPosition({ instance }) {
			return {
				line: 0,
				ch: 0,
			}
		},
	}
)

export default ImageViewerClient
