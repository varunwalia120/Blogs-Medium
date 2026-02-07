import { z } from "zod";

export const signupInput = z.object({
    email: z.string().email(),
    password: z.string(),
    name: z.string()
});

export type SignupType = z.infer<typeof signupInput>;

export const signinInput = z.object({
    email: z.string().email(),
    password: z.string(),
});

export type SigninType = z.infer<typeof signinInput>;

export const createblogInput = z.object({
    title: z.string(),
    content: z.string(),
});

export type CreateBlogInput = z.infer<typeof createblogInput>;

export const updateblogInput = z.object({
    title: z.string().optional(),
    content: z.string().optional(),
});

export type UpdateBlogInput = z.infer<typeof updateblogInput>;