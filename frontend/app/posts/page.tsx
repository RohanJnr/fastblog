import { cookies } from 'next/headers';
import { Post } from '@/types';
import PostsComponent from './posts';

async function getData() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    const res = await fetch('http://localhost:8000/api/posts/me', {
        headers: {
            // @ts-ignore
            "Authorization": `Bearer ${token.value}`
        }
    })
    return res.json()

}

export default async function UserPosts() {
    const data: Post[] = await getData()

    const handleDelete = async (id: number) => {
        "use server";
        const cookieStore = cookies();
        const token = cookieStore.get('token');

        const response = await fetch(`http://localhost:8000/api/posts/${id}`, {
            method: "DELETE",
            headers: {
                // @ts-ignore
                "Authorization": `Bearer ${token.value}`
            }
        })

        if (response.status === 200) {
            return true
        }
        else {
            return false
        }

    }

    return (
        <PostsComponent data={data} handleDelete={handleDelete} />
    )
}