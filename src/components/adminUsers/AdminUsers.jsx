import React from 'react'
import styles from './adminUsers.module.css'
import { deleteUser } from '@/lib/actions'
import Image from 'next/image'
import { getUsers } from '@/lib/data'

const AdminUsers = async () => {

    const users = await getUsers()



    return (
        <div className={styles.container}>
            <h1>Users</h1>
            {users.map(user => (
                <div key={user.id} className={styles.user}>
                    <div className={styles.detail}>
                        <Image src={user.img || "/noAvatar.png"} alt='' width={50} height={50} />
                        <span>{user.username}</span>
                    </div>
                    <form action={deleteUser}>
                        <input type="hidden" name='id' value={user.id} />
                        <button className={styles.userButton}>
                            Delete
                        </button>
                    </form>
                </div>
            ))
            }
        </div >
    )
}

export default AdminUsers
