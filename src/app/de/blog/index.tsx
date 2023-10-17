import React from "react";
import BlogIndexComponent from "@/components/routesCompponents/BlogComponents/BlogIndexComponent";

const IndexBlogRoute = () => {
  const lang = "de";
  return <BlogIndexComponent langPage={lang} />;
};
export default IndexBlogRoute;
