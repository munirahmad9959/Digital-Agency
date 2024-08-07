import { connectToDb } from "@/lib/utils"
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        connectToDb();

        const posts = await Post.find();

        return NextResponse.json(posts);

    } catch (error) {
        console.log(`Error in blog/route.js: ${error}`)
        throw new Error("Failed to fetch posts data")
    }
}
