"use client";

import { useState } from 'react';
import { redirect } from 'next/navigation';

export default function CreatePost() {

    const [title, settitle] = useState('');
    const [description, setdescription] = useState('');

    const handletitleChange = (event) => {
        settitle(event.target.value);
    };

    const handledescriptionChange = (event) => {
        setdescription(event.target.value);
    };

    const handleSubmit = async (event) => {
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
        }).then(Response => {
            redirect("/posts")
        })
        // Reset form fields
        settitle('');
        setdescription('');
    };

    return (
        <form onSubmit={handleSubmit} className='flex flex-col justify-start gap-5'>
                <label htmlFor="title">title:</label>
                <input className='p-2 rounded border-2' type="text" value={title} onChange={handletitleChange} />
                <label htmlFor="description">description:</label>
                <textarea className='p-2 rounded border-2' value={description} onChange={handledescriptionChange} />
            <button className='py-2 px-4 bg-black text-white rounded' type="submit">Submit</button>
        </form>
    );
}