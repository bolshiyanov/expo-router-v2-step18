import React from "react";
import BlogIndexComponent from "@/components/routesCompponents/BlogComponents/BlogIndexComponent";

const IndexBlogRoute = () => {
  const lang = "it";
  return <BlogIndexComponent langPage={lang} />;
};
export default IndexBlogRoute;