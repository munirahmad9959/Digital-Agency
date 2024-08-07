import { addPost, deletePost } from '@/lib/actions'
import React from 'react'

const page = () => {
    return (
        <div>
            <form action={addPost} style={{ display: "flex", alignItems: "center", flexDirection: "column", gap: "10px" }}>
                <input type="text" name="title" placeholder='Title' />
                <input type="text" name="desc" placeholder='Description' />
                <input type="text" name="slug" placeholder='Slug' />
                <input type="text" placeholder='Image' name="img" />
                <input type="text" name="userId" placeholder='userId' />
                <button>Create New Post</button>
            </form>

            <form action={deletePost}>
                <input type="text" name='id' placeholder='postId'/>
                <button>Delete Post</button>
            </form>
        </div>
    )
}

export default page
