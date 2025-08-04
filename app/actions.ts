'use server';

import { signUpSchema } from './schemas';

export async function signUpAction(values: {
    name: string;
    email: string;
    password: string;
    confirmPassword: string;
}) {
    const result = signUpSchema.safeParse(values);

    if (!result.success) {
        return {
            success: false,
            errors: result.error.flatten().fieldErrors,
        };
    }

    return { success: true };
}