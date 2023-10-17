import { DataShopTypeInterface } from "@/constants/types/dataShopType";

const uniqueShopData = (array: DataShopTypeInterface []): DataShopTypeInterface [] => {
  const uniqueObjects: DataShopTypeInterface [] = [];
  const seenObjects = new Set<string>();

  for (const item of array) {
    const itemString = JSON.stringify(item);
    if (!seenObjects.has(itemString)) {
      seenObjects.add(itemString);
      uniqueObjects.push(item);
    }
  }

  return uniqueObjects;
};

export default uniqueShopData;