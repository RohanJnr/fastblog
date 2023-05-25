"use client"
import { useContext } from "react"
import { AuthContext } from "./AuthContext"

import { User } from "./AuthContext"

export default function LandingPage({data}: {data:User}) {
    console.log("DATA IS HERE")
    console.log(data)
    const { user, login } = useContext(AuthContext)

    if (data) {

        if (data.error){
            console.log("Invalid Token")
        }
        else {
            login(data)
        }
    }

    return (
        <div className="flex flex-col justify-start items-center h-[100vh] my-[10%]">
            {user ?(
                <h1>Welcome {`${data.username}#${data.discriminator}`}</h1>
            ):(
                <div>

                    <h1 className="">Welcome to FastBlog</h1>
                    <a className="px-4 py-2 rounded bg-black text-white" href="http://localhost:8000/api/auth/discord/authorize">Discord Login</a>
                </div>
            )}
            
        </div>
    )
}