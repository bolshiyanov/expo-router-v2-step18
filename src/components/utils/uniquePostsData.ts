import { DataPostsTypeInterface } from "../../constants/types/dataPostsType"

const uniquePostsData = (array: DataPostsTypeInterface[]): DataPostsTypeInterface[] => {
  const uniqueObjects: DataPostsTypeInterface[] = [];
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

export default uniquePostsData;