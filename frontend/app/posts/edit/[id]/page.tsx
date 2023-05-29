import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

import EditForm from './EditForm';

async function getData(post_id: number) {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    const res = await fetch(`http://localhost:8000/api/posts/${post_id}`, {
        headers: {
            // @ts-ignore
            "Authorization": `Bearer ${token.value}`
        }
    })
    return res.json()

}

export default async function UserPosts({params}) {
    const post_id = params.id

    const data = await getData(post_id)

    return (
        <EditForm title={data.title} description={data.description} post_id={post_id} />
    )
}