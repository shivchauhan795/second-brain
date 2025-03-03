"use client";
import { signIn } from "next-auth/react";
import { useRef } from "react";
import toast, { Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
export default function Form() {
    const emailRef = useRef<HTMLInputElement>(null);
    const passwordRef = useRef<HTMLInputElement>(null);
    const router = useRouter();
    async function handleFormSubmit() {
        try {
            const response = await signIn("credentials", {
                email: emailRef.current?.value,
                password: passwordRef.current?.value,
                redirect: false,
            });
            console.log(response);
            if (response?.status === 200) {
                toast.success("Signed In successfully");
                router.push("/dashboard");
            } else {
                toast.error("Sign-in failed");
            }
        } catch (e) {
            console.log(e);
            toast.error("Sign-in failed");
        }
    }

    return (
        <div className="flex justify-center items-center h-screen">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="flex flex-col justify-center items-center border p-7 rounded-xl gap-4">
                <div className="text-3xl font-semibold pb-3">Sign In</div>
                <form className='flex flex-col gap-5' action={handleFormSubmit}>
                    <div className="flex flex-col gap-3">
                        <input ref={emailRef} className="border p-2 rounded " type="email" placeholder="Email" />
                        <input ref={passwordRef} className="border p-2 rounded " type="password" placeholder="Password" />
                    </div>
                    <button
                        type='submit'
                        className="border p-2 rounded-lg cursor-pointer">
                        Sign In
                    </button>
                </form>
            </div>
        </div>
    );
}