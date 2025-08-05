"use client"

import { useForm } from 'react-hook-form';
import { Field, TextFieldProps, SignUpValues, TextFieldType } from "../types";
import { signUpSchema } from "../schemas";
import { signUpAction } from "../actions";
import { zodResolver } from '@hookform/resolvers/zod';
import { useRouter } from 'next/navigation';
import { inter, lato } from '../fonts';
import Heading from '../_components/heading';
import PageHeading from '../_components/heading';

export default function SignUpPage() {
    const router = useRouter();

    const {
        register,
        handleSubmit,
        setError,
        formState: { errors },
    } = useForm<SignUpValues>({
        mode: 'onBlur',
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
        <main className='p-4'>
            <PageHeading text="Registro" />
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 max-w-md">
                <TextField register={register} error={errors.name?.message} name={Field.Name} label="Nombre" />

                <TextField register={register} error={errors.email?.message} name={Field.Email} label="Email" />

                <TextField register={register} error={errors.password?.message} name={Field.Password} label="Contraseña" type={TextFieldType.Password} />

                <TextField register={register} error={errors.confirmPassword?.message} name={Field.ConfirmPassword} label="Confirmar contraseña" type={TextFieldType.Password} />

                <button type="submit" className={`${inter.className} bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition-colors duration-300 w-full mx-auto block`}>
                    Enviar
                </button>
            </form>
        </main>
    )
}

function TextField({ register, error, name, label, type = TextFieldType.Text }: TextFieldProps) {
    return (
        <div className='flex flex-col space-y-1'>
            <label className={`${lato.className} text-sm`}>{label}</label>
            <input className={`${lato.className} border rounded-xs border-slate-300 px-2 py-2.5`} {...register(name)} type={type} />
            <p className={`${lato.className} text-red-500 text-sm`}>{error}</p>
        </div>
    )
}