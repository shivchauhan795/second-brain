"use client";
import { useRef, useState } from "react";
import Cross from "../icons/Cross";
import Button from "./Button";
import { useSession } from "next-auth/react";
import toast, { Toaster } from "react-hot-toast";

enum ContentType {
    youtube = "youtube",
    twitter = "twitter"
}

export default function AddContentDialog({ IsOpen, onClose }: { IsOpen: boolean, onClose: () => void }) {
    const titleRef = useRef<HTMLInputElement>(null);
    const linkRef = useRef<HTMLInputElement>(null);
    const [contentType, setContentType] = useState(ContentType.youtube);
    const { data: session } = useSession();

    async function handleAddContent() {
        const title = titleRef.current?.value;
        const link = linkRef.current?.value;
        const type = contentType;
        if (!session) {
            toast.error("No session found! User not logged In");
            return;
        }
        if (!title || !link || !type) {
            toast.error("Fill all the fields!");
            return;
        }
        const userId = session?.user?.email;

        const response = await fetch("/api/v1/addContent", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ title, link, type, userId })
        })

        if (!response.ok) {
            toast.error("Content Addition Failed");
            return;
        }
        
        titleRef.current!.value = "";
        linkRef.current!.value = "";
        onClose();
        toast.success("Content Added Successfully");
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

                        <div className="flex flex-col gap-3 justify-center items-center text-black pb-3">

                            <input ref={titleRef} type="text" className="p-2 border rounded-md " placeholder="Enter Title" />

                            <input ref={linkRef} type="text" className="p-2 border rounded-md " placeholder="Enter Link" />
                            <div className="flex gap-2">

                                <Button onClick={() => { setContentType(ContentType.youtube) }} selection={contentType === ContentType.youtube ? true : false} text="Youtube" />
                                <Button onClick={() => { setContentType(ContentType.twitter) }} selection={contentType === ContentType.twitter ? true : false} text="Twitter" />
                            </div>

                            <Button text="Add Content" onClick={() => { handleAddContent() }} />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
