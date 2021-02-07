import { state } from '@mkenzo_8/puffin'
import Languages from '../collections/languages'
import StaticConfig from 'StaticConfig'
import throwError from '../utils/throw_error'
import { PuffinState } from 'Types/puffin.state'
const globalAny: any = global

let initialTranslations = {}

if (Languages[StaticConfig.data.appLanguage]) {
	const data = Languages[StaticConfig.data.appLanguage].translations
	initialTranslations = data
} else {
	initialTranslations = Languages.en.translations
	const err = `Couldnt find language by name ${StaticConfig.data.appLanguage}`
	throwError(err, err)
}

const LanguageState: PuffinState = new state({
	translations: initialTranslations,
	fallbackTranslations: Languages.en.translations,
})

function setFallback(notFoundLang: string): void {
	StaticConfig.data.appLanguage = 'english'
	LanguageState.data.translations = Languages[StaticConfig.data.appLanguage].translations
	const err = `Couldnt find language by name ${notFoundLang}`
	throwError(err, err)
}

StaticConfig.keyChanged('appLanguage', (newLanguage: string) => {
	if (Languages[newLanguage].name === 'Default') {
		if (Languages[globalAny.navigator.language]) {
			LanguageState.data.translations = Languages[globalAny.navigator.language].translations
		}
	} else if (Languages[newLanguage]) {
		LanguageState.data.translations = Languages[newLanguage].translations
	} else {
		//Fallback to english if the configured language is not found
		setFallback(newLanguage)
	}
})

export { LanguageState }
