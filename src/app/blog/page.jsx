import React from 'react'
import styles from './blog.module.css'
import PostCard from '@/components/postCard/PostCard'
import { getPosts } from '@/lib/data'

const getData = async () => {
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/api/blog`)
  if (!response.ok) {
    throw new Error('Something went wrong')
  }
  return response.json()
}

export const metadata = {
  title: "Blog Page",
  description: "Browse through our blog posts to get the latest news and updates",
};


const BlogPage = async () => {

  const posts = await getData()

  // const posts = await getPosts()

  return (
    <div className={styles.container}>
      {posts.map(post => (
        <div className={styles.post} key={post.id}>
          <PostCard post={post} />
        </div>
      ))}
    </div>
  )
}

export default BlogPage
