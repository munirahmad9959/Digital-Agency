'use client'

import React, { useEffect, useState } from 'react'
import styles from './adminPostForm.module.css'
import { addPost } from '@/lib/actions'
import { useFormState } from 'react-dom'
import { useSession } from 'next-auth/react'

const AdminPostForm = () => {
  const { data: session, status } = useSession()

  // State to store userId
  const [userId, setUserId] = useState('')

  // Ensure hooks are called unconditionally
  const [state, formAction] = useFormState(addPost, undefined)

  // Handle session and set userId
  useEffect(() => {
    if (session && session.user) {
      setUserId(session.user.id)
    }
  }, [session])

  // If session is still loading, you can handle it accordingly
  if (status === 'loading') {
    return <div>Loading...</div>
  }

  // Ensure session is available before rendering the form
  if (!session) {
    return <div>You need to be logged in to add posts.</div>
  }

  return (
    <form action={formAction} className={styles.container}>
      <h1>Add New Post</h1>
      <input type="hidden" name='userId' value={userId} />
      <input type="text" name='title' placeholder='Title' />
      <input type="text" name='slug' placeholder='Slug' />
      <input type="text" name='img' placeholder='Image' />
      <textarea type="text" name='desc' placeholder='Description' rows={10} />
      <button>Add</button>
      {state && state.error}
    </form>
  )
}

export default AdminPostForm
