import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import FeedRender from './render';

import { Post } from '@/types';

async function getData() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    const res = await fetch('http://localhost:8000/api/posts/', {
        headers: {
            // @ts-ignore
            "Authorization": `Bearer ${token.value}`
        }
    })
    if (res.status === 200) {
        return res.json()
    }
    else {
        return redirect("/")
    }

}

export default async function FeedPage() {
    // const cookieStore = cookies();
    // const token = cookieStore.get('token');


    const data: Post[] = await getData()

    const handleLike = async (id: number, index: number) => {
        "use server"
        const cookieStore = cookies();
        const token = cookieStore.get('token');
        const res = await fetch(`http://localhost:8000/api/posts/toggle_like/${id}`, {
            headers: {
                // @ts-ignore
                "Authorization": `Bearer ${token.value}`
            }
        })
        if (res.status === 200) {
            return true
        }
        else {
            return false
        }
    }

    return (
        <FeedRender data={data} handleLike={handleLike} />
    )
}