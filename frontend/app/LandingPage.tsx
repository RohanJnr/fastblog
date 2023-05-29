"use client"
import { useContext } from "react"
import { AuthContext } from "./AuthContext"


export default function LandingPage() {
    const { user, login } = useContext(AuthContext)

    return (
        <div className="flex flex-col justify-start items-center h-[100vh] my-[10%]">
            {user ?(
                <h1>Welcome {`${user.username}#${user.discriminator}`}</h1>
            ):(
                <div>

                    <h1 className="">Welcome to FastBlog</h1>
                    <a className="px-4 py-2 rounded bg-black text-white" href="http://localhost:8000/api/auth/discord/authorize">Discord Login</a>
                </div>
            )}
            
        </div>
    )
}