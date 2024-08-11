'use client'

import LoginForm from "@/components/loginForm/LoginForm"
import { useSession, signIn, signOut } from "next-auth/react"
import React, { useEffect } from 'react'
import styles from './login.module.css'
import { useRouter } from "next/navigation"

const LoginPage = () => {
  const { data: session } = useSession()
  const router = useRouter()


  useEffect(() => {
    if (session) {
      console.log("Session data:", session)
      // router.push("/")
    }
  }, [session])


  return (
    <div className={styles.container}>
      <div className={styles.wrapper}>
        <form action='' >
          <button type="button" onClick={() => signIn('github')} className={styles.github}>Login with Github</button>
          {
            session && (
              <p>Signed In successfully</p>
            )
          }
        </form>

        <LoginForm />
      </div>

    </div >
  )
}

export default LoginPage
