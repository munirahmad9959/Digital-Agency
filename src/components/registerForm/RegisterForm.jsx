'use client'

import React, { useEffect } from 'react'
import styles from "./registerForm.module.css"
import { useFormState } from "react-dom";
import { register } from '@/lib/actions';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const RegisterForm = () => {

    const [state, formAction] = useFormState(register, undefined);

    const router = useRouter();

    useEffect(() => {
        state?.success && router.push('/login')
    }, [state?.success, router])

    return (
        <form action={formAction} className={styles.form}>
            <input type="text" placeholder='username' name='username' />
            <input type="email" placeholder='email' name='email' />
            <input type="password" placeholder='password' name='password' />
            <input type="password" placeholder='password again' name="passwordRepeat" />
            <button>Register</button>
            {state?.error}
            <Link href={'/login'}>Have an account? <strong>Login</strong></Link>
        </form>
    )
}

export default RegisterForm
