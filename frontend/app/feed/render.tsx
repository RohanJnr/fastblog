"use client"

import { useState, useEffect } from "react"

export default function FeedRender(params) {
    console.log("HERE IS DATA")
    console.log(params.data)
    const [data, setData] = useState([])
    console.log("AFTER SET DATA")

    useEffect(() => {
        setData(params.data)
    }, [])

    const handleLike = params.handleLike

    const handleLikeLocal = (id: number, index: number) => {
        handleLike(id, index).then((result: boolean) => {
            if (result) {
                const newData = [...data]
                newData[index]["liked"] = !newData[index]["liked"]
                setData(newData)
            }
        })
    }

    return (
        <div>
            <h1>Feed Page</h1>
            <div className='flex flex-col justify-start items-start gap-10 w-full'>
                {data.map((item, index) => (
                    <div key={index} className='bg-[#f1f1f1] w-full rounded p-10'>
                        <a className='text-xl text-blue-600' href={`feed/${item.id}`}>{item.title}</a>
                        <p className='text-xs'>Published at: {item.created_at}</p>
                        <div className='flex justify-start items-center gap-2'>
                            <p className='text-xs'>Published by</p>
                            <img src={item.user.avatar} alt="" className='h-5 w-5 rounded-full' />
                            <p className='text-xs'>{item.user.username}#{item.user.discriminator}</p>
                        </div>
                        <button onClick={() => handleLikeLocal(item.id, index)} className={`px-4 py-2 rounded my-5 ${item.liked ? 'bg-red-200' : 'bg-green-200'}`}>{item.liked ? "Dislike" : "Like"}</button>
                    </div>
                ))}
            </div>
        </div>
    )
}