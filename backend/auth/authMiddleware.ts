import { createMiddleware } from "hono/factory"
import { verify } from "hono/jwt"
import type { JWTPayload } from "hono/utils/jwt/types"

type AppJwtPayload = JWTPayload & {
  id: string
}

export const authMiddleware = createMiddleware<{
  Bindings: {
    JWT_SECRET: string
  }
  Variables: {
    userId: string
  }
}>(async (c, next) => {
  const authHeader = c.req.header("Authorization")

  // 1️⃣ check header
  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    c.status(403)
    return c.json({ message: "Unauthorized" })
  }

  try {
    // 2️⃣ extract token
    const token = authHeader.split(" ")[1]

    // 3️⃣ VERIFY → needs algorithm
    const decoded = (await verify(token, c.env.JWT_SECRET, "HS256")) as AppJwtPayload

    // 4️⃣ store ONLY userId
    c.set("userId", decoded.id)

    await next()
  } catch {
    c.status(403)
    return c.json({ message: "Invalid token" })
  }
})
