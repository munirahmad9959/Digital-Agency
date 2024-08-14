'use client'

import React, { useEffect, useState } from 'react'
import styles from './adminUserForm.module.css'
import { addUser } from '@/lib/actions'
import { useFormState } from 'react-dom'
import { useSession } from 'next-auth/react'

const AdminUserForm = () => {

    const [state, formAction] = useFormState(addUser, undefined)

    return (
        <form action={formAction} className={styles.container}>
            <h1>Add New User</h1>
            <input type="text" name='username' placeholder='Username' />
            <input type="email" name='email' placeholder='Email' />
            <input type="password" name='password' placeholder='Password' />
            <input type="text" name='img' placeholder='Image' />
            <textarea type="text" name='desc' placeholder='Description' rows={10} />
            <button>Add</button>
            {state && state.error}
        </form>
    )
}

export default AdminUserForm
