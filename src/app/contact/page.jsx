import React from 'react'
import styles from "./contact.module.css"
import Image from 'next/image'

export const metadata = {
  title: "Contact Page",
  description: "Contact us for any inquiries or questions you may have",
};

const ContactPage = () => {
  console.log("it is working on the server-side")
  return (
    <div className={styles.container}>
      <div className={styles.imgContainer}>
        <Image src='/contact.png' alt='' fill className={styles.img}/>
      </div>
      <div className={styles.formContainer}>
        <form action="" className={styles.form}>
          <input type="text" placeholder='Name and Surname' />
          <input type="text" placeholder='Email' />
          <input type="text" placeholder='Phone Number(Optional)' />
          <textarea name="" id="" cols='30' rows='10' placeholder='Message'></textarea>
          <button>Send</button>
        </form>
      </div>
    </div>
  )
}

export default ContactPage
