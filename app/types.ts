import z from "zod";
import { signUpSchema } from "./schemas";

export type SignUpValues = z.infer<typeof signUpSchema>;