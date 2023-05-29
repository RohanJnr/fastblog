"use client"

import React, { useContext } from 'react'
import { useState } from 'react';
import { AuthContext } from "./AuthContext"
import { redirect } from 'next/navigation';

export default function Navbar() {
    const { user, logout } = useContext(AuthContext)
    const [isActive, setIsActive] = useState(false);
    const toggleNav = (event: React.MouseEvent<HTMLButtonElement>) => {
        setIsActive(current => !current);
    };

    const handleLogout = () => {
        console.log("LOGOUT")
        redirect("http://localhost:8000/api/auth/discord/authorize")
    };

    return (
        <nav className="w-full md:w-4/5 mx-auto text-text-75 px-4 lg:px-0">
            <div className="flex items-center justify-between md:py-10 md:px-5">
                <div className="flex justify-center items-center gap-2">
                    <a href="/" className="font-bold">Fast Blog</a>
                </div>

                <div className="hidden pt-2 lg:flex justify-around items-center gap-10">

                    {user ? (
                        <>
                            <a href="/feed" className="font-medium">Feed</a>
                            <a href="/posts" className="font-medium">My Posts</a>
                            <a href="/posts/create" className="font-medium">Add Post</a>
                            <a href="http://localhost:8000/api/auth/discord/logout" className="font-medium">Logout from {user.username} </a>
                        </>
                    ) : (

                        <a href="http://localhost:8000/api/auth/discord/authorize" className="font-medium">Discord Login</a>
                    )}

                </div>
                {/* <!-- Hamburger Icon --> */}
                <button onClick={toggleNav} className={`${isActive ? 'open' : ''} hamburger lg:hidden focus:outline-none flex flex-col items-center justify-around`}>
                    <span className="hamburger-top"></span>
                    <span className="hamburger-middle"></span>
                    <span className="hamburger-bottom"></span>
                </button>
            </div>

            {/* <!-- Mobile Menu --> */}
            <div className="lg:hidden z-10">
                <div id="menu"
                    className={`z-10 absolute flex-col items-center ${isActive ? 'flex opacity-100' : 'hidden opacity-0'} duration-300 ease-in rounded-lg self-end py-8 mt-10 space-y-6 font-bold bg-[#1f1f1f] sm:w-auto sm:self-center left-6 right-6 drop-shadow-md`}>
                    <a href="/" className="font-medium">FastBlog</a>
                    <a href="/feed" className="font-medium">Feed</a>
                    <a href="/" className="font-medium">My Posts</a>
                    <a href="/" className="font-medium">Logout</a>
                </div>
            </div>
        </nav>
    )
}