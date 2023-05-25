import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';


async function getsda() {
    const cookieStore = cookies();
    const token = cookieStore.get('token');

    const res = await fetch('http://localhost:8000/api/posts/', {
        headers: {
            // @ts-ignore
            "Authorization": `Bearer ${token.value}`
        }
    })
    if (res.status === 200){
        return res.json()
    }
    else {
        return redirect("/")
    }

}

export default async function FeedPage() {
    // const cookieStore = cookies();
    // const token = cookieStore.get('token');


    const data = await getsda()

    return (
        <div>
            <h1>Feed Page</h1>
            {data.map((item, index) => (
                <h3 key={index} className="text-blue-500">{item.title}</h3>
            ))}
        </div>
    )
}