import React from "react";
import BlogPagesComponent from "@/components/routesCompponents/BlogComponents/BlogPagesComponent";
import data from "@/data/data";

const BlogPagesxRoutes = () => {
  const lang = "fr";
  return <BlogPagesComponent langPage={lang}/>;
};
export default BlogPagesxRoutes; 

export async function generateStaticParams(): Promise<
  Record<string, string>[]
> {
  return Promise.resolve(data.map((item) => ({ path: item.path})));
}