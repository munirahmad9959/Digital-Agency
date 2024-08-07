"use server"

import { connectToDb } from "./utils";
import { Post } from "./models";
import { revalidatePath } from "next/cache";

export const addPost = async (formData) => {
    const { title, desc, slug, img, userId } = Object.fromEntries(formData);
    try {
        connectToDb();
        const newPost = new Post({
            title,
            desc,
            slug,
            img,
            userId
        });

        await newPost.save()
        console.log("saved to Db post created successfully")
        revalidatePath('/blog')             //it is going to show our fresh data whenever we add new post or data
    } catch (error) {
        console.log(`Error occured in actions.js file check for details: ${error}`)
        return
    }
}


export const deletePost = async (formData) => {
    const { id } = Object.fromEntries(formData)
    try {
        connectToDb();
        await Post.findByIdAndDelete(id)
        console.log("Post deleted successfully")
        revalidatePath('/blog')
    }
    catch (error) {
        console.log(`Error occured in actions.js file check for details: ${error}`)
        return
    }
}