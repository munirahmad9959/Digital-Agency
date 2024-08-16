import { connectToDb } from "@/lib/utils";
import { Post } from "@/lib/models";
import { NextResponse } from "next/server";

export const GET = async (request) => {
    try {
        // Await the connection to ensure it is established
        await connectToDb();

        // Fetch posts from the database
        const posts = await Post.find();

        // Return the posts as JSON
        return NextResponse.json(posts);

    } catch (error) {
        // Log the error and throw a more descriptive error
        console.error(`Error in blog/route.js: ${error.message}`);
        return NextResponse.json({ error: "Failed to fetch posts data" }, { status: 500 });
    }
}
