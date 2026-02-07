import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

/* ================= BLOG TYPE ================= */

export interface Blog {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
  };
}

/* ================= SINGLE BLOG ================= */

export const useBlog = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [blog, setBlog] = useState<Blog | null>(null);

  useEffect(() => {
    if (!id) return;

    axios
      .get<{ blog: Blog }>(`${BACKEND_URL}/api/v1/blog/${id}`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlog(response.data.blog);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);

  return { loading, blog };
};

/* ================= ALL BLOGS ================= */

export const useBlogs = () => {
  const [loading, setLoading] = useState(true);
  const [blogs, setBlogs] = useState<Blog[]>([]);

  useEffect(() => {
    axios
      .get<{ blogs: Blog[] }>(`${BACKEND_URL}/api/v1/blog/bulk`, {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
      .then((response) => {
        setBlogs(response.data.blogs);
        setLoading(false);
      })
      .catch(() => {
        setLoading(false);
      });
  }, []);

  return { loading, blogs };
};
