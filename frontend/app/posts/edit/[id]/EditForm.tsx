"use client";

import { useState, useEffect } from 'react';

export default function EditForm(params: {post_id: number, title: string, description: string}) {

    const post_id = params.post_id

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

    useEffect(()=> {
        setTitle(params.title)
        setDescription(params.description)
    }, [])

    const handletitleChange = (event: Event) => {
        if (!event.target) return
        setTitle((event.target as HTMLInputElement).value);
    };

    const handledescriptionChange = (event: Event) => {
        if (!event.target) return
        setDescription((event.target as HTMLInputElement).value);
    };

    const handleSubmit = async (event: Event) => {
        event.preventDefault();
        // Perform form submission logic here
        console.log('title:', title);
        console.log('description:', description);
        const data = {
            title,
            description
        }

        fetch(`http://localhost:8000/api/posts/${post_id}`, {
            method: "PUT",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data),
            credentials: "include"
        }).then(response => {
            console.log(response.status)
            if (response.status === 200) {
                alert("Updated.")
            } else {
                alert("something went wrong")
            }
        }).catch(err => alert(err))
        // Reset form fields
        setTitle('');
        setDescription('');
    };

    return (
        // @ts-ignore
        <form onSubmit={handleSubmit} className='flex flex-col justify-start gap-5'>
            <h1>Edit Form</h1>
                <label htmlFor="title">title:</label>
                {/* @ts-ignore */}
                <input className='p-2 rounded border-2' type="text" value={title} onChange={handletitleChange} />
                <label htmlFor="description">description:</label>
                {/* @ts-ignore */}
                <textarea className='p-2 rounded border-2' value={description} onChange={handledescriptionChange} />
            <button className='py-2 px-4 bg-black text-white rounded' type="submit">Submit</button>
        </form>
    );
}