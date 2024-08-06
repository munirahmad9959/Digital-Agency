import React from 'react'
import Image from 'next/image'
import styles from "./about.module.css"

export const metadata = {
  title: "About Page",
  description: "Learn more about ByteDigital and what we do",
};

const AboutPage = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <h2 className={styles.subtitle}>About Agency</h2>
        <h1 className={styles.title}>
          We create digital ideas that are bigger, bolder, braver and better.
        </h1>
        <p className={styles.desc}>We create digital ideas that are bigger, bolder, braver, and better. We believe in good ideas, flexibility, and precision. We're world-class. Our special team provides the best consulting and finance solutions. We offer a wide range of web and software development services.</p>
        <div className={styles.boxes}>
        <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
          <div className={styles.box}>
            <h1>10 K+</h1>
            <p>Year of experience</p>
          </div>
        </div>
      </div>
      <div className={styles.imgContainer}>
        <Image src="/about.png" alt="About Image" fill className={styles.img}/>
      </div>
    </div>
  )
}

export default AboutPage
