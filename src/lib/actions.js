"use server"

import { connectToDb } from "./utils";
import { Post, User } from "./models";
import { revalidatePath } from "next/cache";
import bcrypt from 'bcrypt';
import { signIn } from "next-auth/react";

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


export const register = async (previousState, formData) => {
    const { username, email, password, img, passwordRepeat } = Object.fromEntries(formData);

    if (password !== passwordRepeat) {
        return {error: "Passwords do not match"}
    }

    try {
        connectToDb();

        const user = await User.findOne({ username });
        if (user) {
            return {error: "Username already exists"}
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({
            username,
            email,
            password: hashedPassword,
            img,
        })
        await newUser.save()
        console.log("New user registered and saved to Db successfully")
        return { success: true }

    } catch (error) {
        console.log(`Error in actions.js file and the error is: ${error}`)
        return { error: "Something went wrong!" }
    }
}

//same function on the client side

// export const login = async (formData) => {
//     const { username, password } = Object.fromEntries(formData);

//     try {
//         await signIn('credentials', {
//             username,
//             password
//         })

//     } catch (error) {
//         console.log(`Error in actions.js file while logging in and the error is: ${error}`)
//         return { error: "Something went wrong!" }
//     }
// }

