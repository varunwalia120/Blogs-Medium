import { useParams } from "react-router-dom";
import { useBlog } from "../hooks";
import { AppBar } from "../components/AppBar";
import { FullBlog } from "../components/FullBlog";

export const Blog = () => {
  const { id } = useParams();

  if (!id) return <div>Invalid blog id</div>;

  const { loading, blog } = useBlog({ id });

  if (loading) return <div>Loading...</div>;
  if (!blog) return <div>Blog not found</div>;

  return (
    <div>
      <AppBar />
      <FullBlog blog={blog} />
    </div>
  );
};
