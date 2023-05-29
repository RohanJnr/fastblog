import { cookies } from 'next/headers';
import { Post } from '@/types';

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
    return (
        <div>
            <h1>Your posts</h1>
            {data.map((item, index) => (
                <div key={index} className='my-20'>
                    <a href={`feed/${item.id}`} key={index} className="text-blue-500 text-lg underline">{item.title}</a>
                    <a href={`posts/edit/${item.id}`}>Edit Post</a>
                </div>
            ))}
        </div>
    )
}