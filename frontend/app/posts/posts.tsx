"use client";
import { Post } from '@/types';
import { useState, useEffect } from "react";

export default function PostsComponent(params: { data: Post[], handleDelete: (id: number) => Promise<boolean> }) {

    const [data, setData] = useState<Post[]>([])

    useEffect(() => {
        setData(params.data)
    }, [])

    const handleDeleteWrapper = async (id: number) => {
        const val = await params.handleDelete(id)
        if (val) {
            alert("Deleted.")
            setData((prevData) => prevData.filter(item => item.id !== id))

        } else {
            alert("Not able to delete.")
        }
    }
    return (
        <div>
            <h1>Your posts</h1>
            {data.map((item, index) => (
                <div key={index} className='my-20 flex flex-col justify-start items-start'>
                    <a href={`feed/${item.id}`} key={index} className="text-blue-500 text-lg underline">{item.title}</a>
                    <div className='flex justify-center items-center gap-5'>
                        <a href={`posts/edit/${item.id}`} className='bg-yellow-200 px-4 py-2 rounded'>Edit Post</a>
                        <button className='bg-red-200 px-4 py-2 rounded' onClick={() => handleDeleteWrapper(item.id)}>Delete</button>
                    </div>
                </div>
            ))}
        </div>
    )
}