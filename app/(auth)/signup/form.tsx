"use client";
import { signIn } from "next-auth/react";
import { redirect } from "next/navigation";
import { useRef } from "react";

export default function Form() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);

    async function handleFormSubmit() {
        try {

            const email = emailRef.current?.value;
            const password = passwordRef.current?.value;

            const response = await fetch("/api/auth/register", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ email, password })
            });

            if (!response.ok) {
                throw new Error(response.statusText);
            }
            console.log(response);
            console.log("Registration Successful");
            signIn()
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="flex flex-col justify-center items-center border p-7 rounded-xl gap-4">
                <div className="text-3xl font-semibold pb-3">Sign Up</div>
                <form className='flex flex-col gap-5' action={handleFormSubmit}>
                    <div className="flex flex-col gap-3">
                        <input ref={emailRef} className="border p-2 rounded " type="email" placeholder="Email" />
                        <input ref={passwordRef} className="border p-2 rounded " type="password" placeholder="Password" />
                    </div>
                    <button
                        type='submit'
                        className="border p-2 rounded-lg cursor-pointer">
                        Sign Up
                    </button>
                </form>
            </div>
        </div>
    );
}