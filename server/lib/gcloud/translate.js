const translateApi = require('@vitalets/google-translate-api');
 
const translate = (sourceText, to = 'zh-TW') => {
  return translateApi(sourceText, {to}).then((res)=>{
    return res.text
  })
}

module.exports = {translate}