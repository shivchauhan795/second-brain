"use client";

import { signIn, signOut } from "next-auth/react";

interface ButtonProps {
    isSession: boolean;
    text: string;
}
export default function Button(props: ButtonProps) {
    return (
        <button
            onClick={() => props.isSession ? signOut() : signIn()}
        >
            {props.text}
        </button>
    )
}