"use client";

import React, { useState } from 'react';
import { redirect } from 'next/navigation';

export default function CreatePost() {

    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');

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

        fetch("http://localhost:8000/api/posts", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
              },
            body: JSON.stringify(data),
            credentials: "include"
        }).then(response => {
            console.log(response.status)
            if (response.status === 200) {
                alert("Created.")
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
            <h1>Add Form</h1>
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