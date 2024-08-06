import React from 'react'
import styles from "./postUser.module.css"
import { getUser } from '@/lib/data'
import Image from 'next/image'

// const getData = async (userId) => {
//     const response = await fetch(`https://jsonplaceholder.typicode.com/users/${userId}`, { cache: "no-store" })
//     if (!response.ok) {
//         throw new Error('Something went wrong')
//     }
//     return response.json()

// }

const PostUser = async ({ userId }) => {

    // const user = await getData(userId)

    const user = await getUser(userId)

    return (
        <div className={styles.container}>
            <Image className={styles.avatar} src={user.img ? user.img : '/noavatar.png'} alt='' width={50} height={50} />
            <div className={styles.texts}>
                <span className={styles.title}>Author</span>
                <span className={styles.username}>{user.username}</span>
            </div>
        </div>
    )
}

export default PostUser
