"use client"

import { useForm } from 'react-hook-form';
import { SignUpValues } from "../types";
import { signUpSchema } from "../schemas";
import { signUpAction } from "../actions";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';

export default function SignUpPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SignUpValues>({
        resolver: zodResolver(signUpSchema),
    });

    const onSubmit = async (data: SignUpValues) => {
        console.log(data)
        const result = await signUpAction(data);

        if (!result.success && result.errors) {
            for (const [field, messages] of Object.entries(result.errors)) {
                setError(field as keyof SignUpValues, {
                    type: 'server',
                    message: messages[0],
                });
            }
            return;
        }
        console.log('Success!');
        if (result.success) {
            router.push('/dashboard'); 
        }
    };
    return (
        <main>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div>
                    <label>Name</label>
                    <input {...register('name')} />
                    <p className="text-red-500 text-sm">{errors.name?.message}</p>
                </div>

                <div>
                    <label>Email</label>
                    <input {...register('email')} type="email" />
                    <p className="text-red-500 text-sm">{errors.email?.message}</p>
                </div>

                <div>
                    <label>Password</label>
                    <input {...register('password')} type="password" />
                    <p className="text-red-500 text-sm">{errors.password?.message}</p>
                </div>

                <div>
                    <label>Confirm Password</label>
                    <input {...register('confirmPassword')} type="password" />
                    <p className="text-red-500 text-sm">{errors.confirmPassword?.message}</p>
                </div>

                <button type="submit" className="bg-blue-500 text-white px-4 py-2">
                    Sign Up
                </button>
            </form>
        </main>
    )
}