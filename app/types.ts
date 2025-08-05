import z from "zod";
import { signUpSchema } from "./schemas";
import { UseFormRegister } from "react-hook-form";

export type SignUpValues = z.infer<typeof signUpSchema>;

export enum Field {
    Name = "name",
    Email = "email",
    Password = "password",
    ConfirmPassword = "confirmPassword"
}

export enum TextFieldType {
    Text = "text",
    Password = "password"
}

export interface TextFieldProps {
    type?: TextFieldType,
    label: string,
    name: Field,
    register: UseFormRegister<SignUpValues>;
    error?: string;
}

export interface PageHeadingProps {
    text: string
}