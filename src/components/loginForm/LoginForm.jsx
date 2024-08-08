'use client'

import React, { useEffect } from 'react'
import styles from "./loginForm.module.css"
import { useFormState } from "react-dom";
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn } from 'next-auth/react';

const LoginForm = () => {

    const login = async (previousState, formData) => {
        const { username, password } = Object.fromEntries(formData);

        const result = await signIn('credentials', {
            username,
            password,
            redirect: false // Prevent automatic redirection
        });

        if (result.error) {
            // Return error to be handled by useFormState
            return {
                error: result.error.includes("CredentialsSignin") ? "Invalid credentials!" : "Something went wrong!"
            };
        }

        // Return success to indicate successful login
        return {
            success: true
        };
    };


    const [state, formAction] = useFormState(login, undefined);

    const router = useRouter();

    useEffect(() => {
        state?.success && router.push('/login')
    }, [state?.success, router])

    return (
        <form action={formAction} className={styles.form}>
            <input type="text" placeholder='username' name='username' />
            <input type="password" placeholder='password' name='password' />
            <button>Login</button>
            {state?.error}
            <Link href={'/register'}>{"Don't have an account?"} <strong>Register</strong></Link>
        </form>
    )
}

export default LoginForm
