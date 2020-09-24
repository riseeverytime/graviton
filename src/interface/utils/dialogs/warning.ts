import Dialog from '../../constructors/dialog'

function WarningDialog() {
	return new Promise((resolve, reject) => {
		const DialogInstance = new Dialog({
			id: 'warning_dialog',
			title: 'Are you sure?',
			content: 'Proceed with caution.',
			buttons: [
				{
					label: 'misc.No',
					action: reject,
				},
				{
					label: 'misc.Yes',
					action: resolve,
				},
			],
		})
		DialogInstance.launch()
		DialogInstance.on('closed', () => {
			reject()
		})
	})
}

export default WarningDialog
