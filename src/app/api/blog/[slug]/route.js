import { connectToDb } from "@/lib/utils"
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request, { params }) => {

    const { slug } = params;

    try {
        connectToDb();

        const post = await Post.findOne({ slug });

        return NextResponse.json(post);

    } catch (error) {
        console.log(`Error in blog/slug/route.js: ${error}`)
        throw new Error("Failed to fetch post data")
    }
}

export const DELETE = async (request, { params }) => {

    const { slug } = params;

    try {
        connectToDb();

        await Post.deleteOne({ slug });
        return NextResponse.json({ message: "post deleted" });

    } catch (error) {
        console.log(`Error in blog/slug/route.js: ${error}`)
        throw new Error("Failed to delete post ")
    }
}

