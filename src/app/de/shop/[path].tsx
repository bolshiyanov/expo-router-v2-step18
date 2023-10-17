import React from "react";
import ShopPagesComponent from "@/components/routesCompponents/ShopComponents/ShopPagesComponent";
import dataShops from "@/data/dataShops";

const ShopPagesRoutes = () => {
  const lang = "de";
  return <ShopPagesComponent langPage={lang}/>;
};
export default ShopPagesRoutes;  

export async function generateStaticParams(): Promise<
  Record<string, string>[]
> {
  return Promise.resolve(dataShops.map((item) => ({ path: item.path})));
}

