"use client";

import { signIn, signOut } from "next-auth/react";
import { RefObject } from "react";

interface ButtonProps {
    authButton?: boolean;
    isSession?: boolean;
    text: string;
    startIcon?: React.ReactNode;
    work?: "addContent" | "shareBrain" | "signOut";
    onClick?: () => void
    selection?: Boolean
}
export default function Button(props: ButtonProps) {
    return (
        <>
            {props.authButton &&

                <span onClick={() => props.isSession ? signOut() : signIn()} className={`flex gap-2 border p-2 w-fit rounded-lg cursor-pointer justify-center items-center ${props.work === "signOut" ? "bg-red-400 text-black" : ""}`}>
                    {props.startIcon}
                    <button
                        className="cursor-pointer"
                    >
                        {props.text}
                    </button>
                </span>
            }
            {!props.authButton &&

                <span onClick={props.onClick} className={`flex gap-2 border p-2 w-fit rounded-lg cursor-pointer justify-center items-center ${props.selection ? "bg-purple-600 text-white" : ""}`}>
                    {props.startIcon}
                    <button
                        className="cursor-pointer"
                    >
                        {props.text}
                    </button>
                </span>
            }
        </>
    )
}