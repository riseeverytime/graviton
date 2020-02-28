import { puffin } from '@mkenzo_8/puffin'
import Languages from '../../../languages/*.json'
import StaticConfig from 'StaticConfig'

const LanguageState = new puffin.state(
    Object.assign({},Languages[StaticConfig.data.language].strings)
)

StaticConfig.changed(function(){
    Object.keys(LanguageState.data).map(function(key){
        LanguageState.data[key] = Languages[StaticConfig.data.language].strings[key]
    })
    LanguageState.triggerChange()
})

function getTranslation(string){
    if(LanguageState.data[string]) {
        return LanguageState.data[string]
    }else if(Languages["english"].strings[string]){
        return Languages["english"].strings[string]
    }else{
        return string
    }
}

export {
    LanguageState,
    getTranslation
}