import { z } from "zod";
export declare const signupInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
    name: z.ZodString;
}, z.core.$strip>;
export type SignupType = z.infer<typeof signupInput>;
export declare const signinInput: z.ZodObject<{
    email: z.ZodString;
    password: z.ZodString;
}, z.core.$strip>;
export type SigninType = z.infer<typeof signinInput>;
export declare const createblogInput: z.ZodObject<{
    title: z.ZodString;
    content: z.ZodString;
}, z.core.$strip>;
export type CreateBlogInput = z.infer<typeof createblogInput>;
export declare const updateblogInput: z.ZodObject<{
    title: z.ZodOptional<z.ZodString>;
    content: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
export type UpdateBlogInput = z.infer<typeof updateblogInput>;
