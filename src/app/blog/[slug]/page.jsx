import React from 'react'
import styles from './singlePost.module.css'
import Image from 'next/image'

const SinglePostPage = () => {
    return (
        <div className={styles.container}>
            <div className={styles.imgContainer}>
                <Image src='https://i.pinimg.com/736x/cf/f9/5a/cff95abae0d9746a76161a7c9910c301.jpg' alt='' fill className={styles.img} />
            </div>

            <div className={styles.textContainer}>
                <h1 className={styles.title}>Title</h1>
                <div className={styles.detail}>
                    <Image className={styles.avatar} src='https://i.pinimg.com/736x/cf/f9/5a/cff95abae0d9746a76161a7c9910c301.jpg' alt='' width={50} height={50} />
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Author</span>
                        <span className={styles.detailValue}>Terry Jefferson</span>
                    </div>
                    <div className={styles.detailText}>
                        <span className={styles.detailTitle}>Published</span>
                        <span className={styles.detailValue}>01.01.2024</span>
                    </div>

                </div>

                <div className={styles.content}>
                    Lorem ipsum dolor, sit amet consectetur adipisicing elit. Eligendi eaque suscipit consequatur quis numquam animi tenetur rerum distinctio modi repellat vero corrupti cum error accusantium, saepe ex repudiandae possimus at ullam aspernatur, dolorem eius alias inventore minima. Vitae voluptate incidunt in ducimus nihil temporibus laboriosam!
                </div>

            </div>
        </div>
    )
}

export default SinglePostPage
