import { z } from "zod";
export const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string()
});
export const signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
});
export const createblogInput = z.object({
    title: z.string(),
    content: z.string(),
});
export const updateblogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});
//# sourceMappingURL=index.js.map