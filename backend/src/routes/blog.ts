import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { authMiddleware } from "../../auth/authMiddleware";
import { createblogInput, updateblogInput } from "varunwalia120-medium-blogs-1";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// protect ALL blog routes
blogRouter.use("/*", authMiddleware);

// CREATE BLOG
blogRouter.post("/", async (c) => {
  const userId = c.get("userId");

  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = createblogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Inavlid Inputs" });
  }

  const post = await prisma.blog.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });

  return c.json({ id: post.id });
});

// GET ALL BLOGS
blogRouter.get("/bulk", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blogs = await prisma.blog.findMany({
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: { email: true },
      },
    },
  });

  return c.json({ blogs });
});

// GET SINGLE BLOG
blogRouter.get("/:id", async (c) => {
  const id = c.req.param("id");

  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const blog = await prisma.blog.findUnique({
    where: { id },
    select: {
      id: true,
      title: true,
      content: true,
      author: {
        select: {
          name: true,
        },
      },
    },
  });

  return c.json({ blog });
});

// UPDATE BLOG
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = updateblogInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Inavlid Inputs enter correct credentials" });
  }

  await prisma.blog.update({
    where: { id: body.id },
    data: {
      title: body.title,
      content: body.content,
    },
  });

  return c.text("Updated");
});
