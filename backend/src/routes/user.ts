import { Hono } from "hono";
import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { sign } from "hono/jwt";
import { authMiddleware } from "../../auth/authMiddleware";
import { signupInput, signinInput } from "varunwalia120-medium-blogs-1";
import { error } from "node:console";

type Bindings = {
  DATABASE_URL: string;
  JWT_SECRET: string;
};

const userRouter = new Hono<{ Bindings: Bindings }>();

//SIGNUP ROUTE
userRouter.post("/signup", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signupInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Invalid Input" });
  }

  try {
    const user = await prisma.user.create({
      data: {
        name: body.name,
        email: body.email,
        password: body.password,
      },
    });

    const jwt = await sign({ id: user.id }, c.env.JWT_SECRET, "HS256");
    return c.json({ jwt });
  } catch (e) {
    console.log(e);
    return c.json({ error: "signup failed", details: String(e) }, 500);
  }
});

//SIGNIN ROUTE
userRouter.post("/signin", async (c) => {
  const prisma = new PrismaClient({
    accelerateUrl: c.env.DATABASE_URL,
  }).$extends(withAccelerate());

  const body = await c.req.json();
  const { success } = signinInput.safeParse(body);
  if (!success) {
    c.status(400);
    return c.json({ error: "Inavlid Credentials" });
  }

  const user = await prisma.user.findUnique({
    where: { email: body.email },
  });

  if (!user) {
    c.status(403);
    return c.json({ error: "user not found" });
  }

  const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
  return c.json({ jwt });
});

export default userRouter;
