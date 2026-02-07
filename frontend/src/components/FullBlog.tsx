interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

export const FullBlog = ({ blog }: { blog: Blog }) => {
  return (
    <div className="flex justify-center">
      <div className="grid grid-cols-12 w-full max-w-screen-xl px-10 pt-12">
        {/* Blog content */}
        <div className="col-span-8">
          <h1 className="text-5xl font-extrabold">{blog.title}</h1>

          <div className="text-slate-500 pt-2">
            Posted by {blog.author?.name || "Anonymous"}
          </div>

          <div className="pt-6 text-lg">{blog.content}</div>
        </div>

        {/* Author sidebar */}
        <div className="col-span-4 pl-10">
          <div className="text-slate-600 text-lg">Author</div>
          <div className="text-2xl font-bold">
            {blog.author?.name || "Anonymous"}
          </div>
        </div>
      </div>
    </div>
  );
};
