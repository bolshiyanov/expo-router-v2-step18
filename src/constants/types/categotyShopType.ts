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

// Define your base interface
interface CategoryInterface {
  categoryId: string;
  image: string;
  region: string;
  deliveryOptions: {
    deliveryCompanyName: string;
    shippingPrice: number;
    deliveryTime: number;
  }[];
}

// Extend the base interface with the dynamic properties
type CategoryShopInterface = CategoryInterface & ReturnType<typeof generateDynamicInterface>;

export { CategoryShopInterface };