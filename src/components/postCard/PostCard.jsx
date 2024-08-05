import React from 'react'
import styles from "./postCard.module.css"
import Image from 'next/image'
import Link from 'next/link'

const PostCard = () => {
    return (
        <div className={styles.container}>
            <div className={styles.top}>
                <div className={styles.imgContainer}>
                    <Image src='https://i.pinimg.com/736x/cf/f9/5a/cff95abae0d9746a76161a7c9910c301.jpg' alt='' fill className={styles.img} />
                </div>
                <span className={styles.date}>01.01.2024</span>
            </div>
            <div className={styles.bottom}>
                <h1 className={styles.title}>Title</h1>
                <p className={styles.desc}>Lorem ipsum dolor, sit amet consectetur adipisicing elit. Officia at eaque porro mollitia laboriosam deserunt eius optio, sunt expedita dolorem vel aut accusantium, dicta natus!
                </p>
                <Link className={styles.link} href={'/blog/post'}>READ MORE</Link>
            </div>
        </div>
    )
}

export default PostCard
