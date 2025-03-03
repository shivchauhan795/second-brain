"use client";
import { useEffect, useState } from "react";
import Cross from "../icons/Cross";

import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";
import Copy from "../icons/Copy";



export default function ShareContentDialog({ IsOpen, onClose }: { IsOpen: boolean, onClose: () => void }) {

    const { data: session } = useSession();
    const [isChecked, setIsChecked] = useState<boolean>(false);
    const [link, setLink] = useState<string>();
    useEffect(() => {
        async function getShareContent() {
            const response = await fetch("/api/v1/shareContent", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "set-cookie": "true"
                },
            })
            const data = await response.json();
            if (data.message === "No Link Found") {
                setIsChecked(false);
            } else {
                setLink(`http://localhost:3000/secondbrain/${data.link?.hash}`);
                setIsChecked(true);
            }
        }
        getShareContent();

    }, []);

    useEffect(() => {
        if (IsOpen && session) {
            handleShareContent();
        }

    }, [isChecked]);

    async function handleShareContent() {

        if (!session) {
            toast.error("No session found! User not logged In");
            return;
        }

        const userId = session?.user?.email;

        const response = await fetch("/api/v1/shareContent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ isChecked, userId })
        })

        if (!response.ok) {
            toast.error("Sharing Failed");
            return;
        }
        const data = await response.json();
        onClose();
        toast.success(data.message);
    }

    return (
        <div>
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            {IsOpen && (
                <div className="w-screen h-screen bg-red-50/90 fixed top-0 left-0 flex flex-col justify-center items-center">
                    <div className="bg-white px-5 py-3 rounded-xl shadow-black shadow-2xl min-w-80 min-h-fit flex flex-col gap-3">

                        <div onClick={() => { onClose() }} className="flex justify-end cursor-pointer text-black">
                            <Cross size="size-6" />
                        </div>
                        <div className="text-black pt-3 font-semibold">
                            Turn the toggle on to share this content with your friends
                        </div>

                        <div className="flex flex-col gap-3 justify-center items-center text-black pb-5">

                            <div className="relative inline-block w-11 h-5">
                                <input
                                    id="switch-component"
                                    type="checkbox"
                                    checked={isChecked}
                                    onChange={() => {
                                        setIsChecked(!isChecked);

                                    }}
                                    className="peer appearance-none w-11 h-5 bg-slate-100 rounded-full checked:bg-purple-600 cursor-pointer transition-colors duration-300"
                                />
                                <label
                                    htmlFor="switch-component"
                                    className="absolute top-0 left-0 w-5 h-5 bg-white rounded-full border border-slate-300 shadow-sm transition-transform duration-300 peer-checked:translate-x-6 peer-checked:border-purple-600 cursor-pointer">
                                </label>
                            </div>

                        </div>
                        <div className="text-black flex justify-center pb-4">
                            {isChecked && link &&
                                <div className="flex gap-2">
                                    <div>
                                        {link}
                                    </div>
                                    <div className="cursor-pointer"
                                        onClick={() => {
                                            navigator.clipboard.writeText(link?.toString())
                                            toast.success("Copied to clipboard");
                                        }}
                                    >
                                        <Copy size="size-5" />
                                    </div>
                                </div>
                            }
                            {!isChecked && "No Link Found"}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
