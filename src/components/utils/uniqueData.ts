import { DataShopTypeInterface } from "@/constants/types/dataShopType";

const uniqueData = (array)=> {
  const uniqueObjects  = [];
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

export default uniqueData;