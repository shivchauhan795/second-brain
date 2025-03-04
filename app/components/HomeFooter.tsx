"use client"
import { redirect } from "next/navigation";


export default function HomeFooter(){
    return (
        <div className="w-screen flex justify-center items-center text-2xl font-bold gap-3 pb-2">
            Made with ❤️ by 
            <div className="cursor-pointer" onClick={()=>redirect("https://shivchauhan.com")}>
                Shiv Chauhan
            </div>
        </div>
    )
}