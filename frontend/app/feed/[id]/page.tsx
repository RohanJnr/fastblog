import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


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

export default async function UserPosts({params}: {params: {id: number}}) {
    const post_id = params.id
    const data = await getData(post_id)

    console.log(data)

    let created_at: Date | string = new Date(data.created_at)
    created_at = created_at.toLocaleDateString()

    let updated_at: Date | string = new Date(data.modified_at)
    updated_at = updated_at.toLocaleDateString()

    return (
        <div>
            <h1>{data.title}</h1>
            <small>Created At: {created_at}</small>
            <br />
            <small>Updated At: {updated_at}</small>
            <p>{data.description}</p>
        </div>
    )
}