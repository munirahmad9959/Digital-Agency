'use client'

import { useSession, signIn, signOut } from "next-auth/react"
import React, { useEffect } from 'react'

const LoginPage = () => {
  const { data: session } = useSession()

  useEffect(() => {
    if (session) {
      console.log("Session data:", session)
    }
  }, [session])

  if (session) {
    return (
      <>
        Signed in as {session.user.email} <br />
        <button onClick={() => signOut()}>Sign out</button>
      </>
    )
  }

  return (
    <div>
      <form action=''>
        <button type="button" onClick={() => signIn('github')}>Login with Github</button>
      </form>
    </div>
  )
}

export default LoginPage
