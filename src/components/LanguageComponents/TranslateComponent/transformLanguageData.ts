import { supportedLang } from "config";

function extractKeys(arr) {
  return arr.map((obj) => Object.keys(obj)[0]);
}

export function modifySupportedLang(supportedLang) {
  return supportedLang.map((langObject) => {
    const [code] = Object.keys(langObject);

    return { code, name: langObject[code] };
  });
}

export default function transformLanguageData(dataType, langPage, item) {
  const modifySupportedLangArray = modifySupportedLang(supportedLang);
  const keys = extractKeys(supportedLang);
  let resultData = null;

  for (const lang of modifySupportedLangArray) {
    if (langPage === lang.code && keys.includes(lang.code)) {
      let langCode = lang.code.charAt(0).toUpperCase() + lang.code.slice(1);
      const langFieldName = `${dataType}${langCode}`;
      
      // Check if the field contains a "*", and if so, use the English field
      if (item[langFieldName] && item[langFieldName].includes('*')) {
        resultData = item[`${dataType}En`];
      } else {
        resultData = item[langFieldName];
      }
      
      break;
    }
  }

  if (resultData === null) {
    resultData = item[`${dataType}En`];
  }

  return resultData;
}