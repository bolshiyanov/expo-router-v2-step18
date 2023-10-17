import { supportedLang } from "config";

const supportedNames = [];

const fieldNamePrefix = "name";


supportedLang.forEach(langObj => {
  const langCode = Object.keys(langObj)[0]; // Get the language code
  const fieldName = `${fieldNamePrefix}${langCode}`; // Combine prefix and code
  supportedNames.push(fieldName); // Add the field name to the array
});
export { supportedNames };