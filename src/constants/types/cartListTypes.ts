
// Function to generate the dynamic interface
function generateDynamicInterface(
  supportedLanguages: { [key: string]: string }[]
) {
  const interfaceProperties: { [key: string]: string } = {};

  supportedLanguages.forEach((lang) => {
    const [langCode] = Object.keys(lang);
    const langName = lang[langCode];

    // Define the property for each language in the interface
    interfaceProperties[`name${langCode}`] = langName;
  });
return interfaceProperties;
}

// Define your interface using the generated properties
interface itemsInCartInterface extends Record<string, string | number> {
  id: string;
  image: string;
  price: number;
  number: number;
}

// Use the mapped type to extend the interface with the dynamic properties
type DynamicInterface = itemsInCartInterface &
  ReturnType<typeof generateDynamicInterface>;
export { DynamicInterface };
