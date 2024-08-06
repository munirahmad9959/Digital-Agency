import { Post, User } from "./models";
import { connectToDb } from "./utils";
import { unstable_noStore as noStore } from "next/cache";

export const getPosts = async () => {
    try {
        connectToDb()
        const posts = await Post.find()
        return posts

    } catch (error) {
        console.log(`Error from data.js file: ${error}`)
        throw new Error("Failed to fetch posts!");
    }
}

export const getPost = async (slug) => {
    try {
        connectToDb()
        const post = await Post.findOne({ slug: slug })
        return post
    } catch (error) {
        console.log(`Error from data.js file: ${error}`)
        throw new Error("Failed to fetch post!");
    }
}

export const getUser = async (id) => {
    noStore()           //this is used so that our users data is not cached and we get the latest data also save space on caching side to improve performance
    try {
        connectToDb()
        const user = await User.findById(id)
        return user
    } catch (error) {
        console.log(`Error from data.js file: ${error}`)
        throw new Error("Failed to fetch user!");
    }
}

export const getUsers = async () => {
    try {
        connectToDb()
        const users = await User.find()
        return users
    } catch (error) {
        console.log(`Error from data.js file: ${error}`)
        throw new Error("Failed to fetch users!");
    }
}

