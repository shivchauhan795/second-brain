"use client";
import toast, { Toaster } from "react-hot-toast";
import Share from "../icons/Share"
import Trash from "../icons/Trash";
import Twitter from "../icons/Twitter";
import Youtube from "../icons/Youtube";
import { useEffect, useState } from "react";

interface CardProps {
    id: string
    title: string,
    link: string
    type: "youtube" | "twitter"
    public: boolean
}

export default function Card(props: CardProps) {
    const [isClient, setIsClient] = useState(false);

    useEffect(() => {
        setIsClient(true);
        if (props.type === "twitter") {
            const script = document.createElement("script");
            script.src = "https://platform.twitter.com/widgets.js";
            script.async = true;
            document.body.appendChild(script);
        }
    }, [props.type]);

    async function deleteContent() {
        try {
            const response = await fetch("/api/v1/deleteContent", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id: props.id })
            })
            if (!response.ok) {
                toast.error("Content Deletion Failed");
                return;
            }
            toast.success("Content Deleted Successfully");
        } catch (e) {
            toast.error("Content Deletion Failed");
        }
    }

    return (
        <div className="flex flex-col border-3 drop-shadow-2xl bg-black text-white justify-between rounded-xl min-w-96 max-w-80 min-h-64 max-h-fit">
            <Toaster
                position="top-center"
                reverseOrder={false}
            />
            <div className="pt-3 px-2 flex flex-col justify-center">
                <div className="flex justify-between items-center px-3">
                    <div className="flex gap-2 p-1 justify-center items-center">
                        <div>
                            {props.type === "youtube" &&
                                <Youtube size="size-8" />
                            }
                            {
                                props.type === "twitter" &&
                                <Twitter size="size-8" />
                            }
                        </div>
                        <div className="text-xl font-semibold">{props.title}</div>
                    </div>
                    {!props.public &&

                        <div className="flex gap-2 p-1 justify-center items-center">
                            <span
                                onClick={
                                    () => {
                                        navigator.clipboard.writeText(props.link);
                                        toast.success("Copied to clipboard");
                                    }

                                } className="cursor-pointer"><Share size="size-7" /></span>
                            <span onClick={deleteContent} className="cursor-pointer"><Trash size="size-7" /></span>
                        </div>
                    }
                </div>
                <div className="flex justify-center">

                    <div className="flex justify-center p-3 max-w-80">
                        {props.type === "youtube" && <iframe src={props.link.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/")} title="YouTube video player" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>}

                        {props.type === "twitter" && isClient && <div className="max-w-80"><blockquote className="twitter-tweet">
                            <a href={props.link.replace("x.com", "twitter.com")}></a>
                        </blockquote></div>}
                    </div>
                </div>
            </div>
        </div >
    );
}