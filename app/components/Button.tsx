"use client";

import { signIn, signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

interface ButtonProps {
    authButton?: boolean;
    isSession?: boolean;
    text: string;
    startIcon?: React.ReactNode;
    work?: "addContent" | "shareBrain" | "signOut";
    onClick?: () => void
    selection?: Boolean
    task?: "moveToSignIn" | "moveToSignUp"
}
export default function Button(props: ButtonProps) {
    const router = useRouter();
    return (
        <>
            {props.authButton &&

                <span onClick={() => props.isSession ? signOut({ callbackUrl: "https://second-brain.shivchauhan.com/signin" }) : signIn()} className={`flex gap-2 border p-2 w-fit rounded-lg cursor-pointer justify-center items-center ${props.work === "signOut" ? "bg-red-400 text-black" : ""}`}>
                    {props.startIcon}
                    <button
                        className="cursor-pointer sm:text-xl text-xs font-semibold"
                    >
                        {props.text}
                    </button>
                </span>
            }
            {!props.authButton && !props.task &&

                <span onClick={props.onClick} className={`flex gap-2 border-2 p-2 w-fit rounded-lg cursor-pointer justify-center items-center ${props.selection ? "bg-purple-600 text-white" : ""}`}>
                    {props.startIcon}
                    <button
                        className="cursor-pointer sm:text-xl text-xs font-semibold"
                    >
                        {props.text}
                    </button>
                </span>
            }
            {props.task &&

                <span
                    onClick=
                    {props.task === "moveToSignIn" ?
                        () => { router.push("/signin") }
                        : () => { router.push("/signup") }
                    }
                    className={`flex gap-2 border-2 p-2 w-fit rounded-lg cursor-pointer justify-center items-center ${props.selection ? "bg-purple-600 text-white" : ""}`}>
                    {props.startIcon}
                    <button
                        className="cursor-pointer sm:text-xl text-xs font-semibold"
                    >
                        {props.text}
                    </button>
                </span>
            }
        </>
    )
}