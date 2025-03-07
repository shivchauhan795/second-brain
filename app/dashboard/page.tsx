"use client";
import Button from "../components/Button";
import Card from "../components/Card";
import AddContentDialog from "../components/AddContentDialog";
import Navbar from "../components/Navbar";
import { useEffect, useState } from "react";
import { SessionProvider, signOut, useSession } from "next-auth/react";
import ShareContentDialog from "../components/ShareContentDialog";
import Refresh from "../icons/Refresh";

interface Content {
    id?: string,
    title?: string,
    link?: string,
    type?: "youtube" | "twitter"
}

export default function Dashboard() {
    // const session = await getServerSession();
    const [isModelOpen, setIsModelOpen] = useState(false);
    const [isShareModelOpen, setIsShareModelOpen] = useState(false);
    const [data, setdata] = useState([]);

    useEffect(() => {
        getContent();
    }, [isModelOpen, isShareModelOpen]);

    async function getContent() {
        try {
            const response = await fetch("/api/v1/getData", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                },
            });
            const data = await response.json();
            setdata(data.content);
            console.log("ye hai data", data);

        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="flex flex-col h-screen w-screen overflow-y-auto justify-between bg-purple-300 text-black">
            <div>

                <SessionProvider>
                    <AddContentDialog IsOpen={isModelOpen} onClose={() => setIsModelOpen(false)} />
                    <ShareContentDialog IsOpen={isShareModelOpen} onClose={() => setIsShareModelOpen(false)} />

                    <Navbar openAddContentModal={() => setIsModelOpen(true)} openShareContentModal={() => setIsShareModelOpen(true)} public={false} />
                </SessionProvider>
                <div className="flex flex-wrap justify-center items-center mx-10 pt-10 gap-10">

                    {data && data.map((item?: Content) => {
                        return (
                            <Card key={item?.id} id={item?.id ?? ""} title={item?.title ?? ""} link={item?.link ?? ""} type={item?.type ?? "twitter"} public={false} />
                        )
                    })}

                </div>
                {data && data.length === 0 && <div className="text-2xl flex justify-center items-center pt-20">No Content Added</div>}

            </div>

            <div className="flex justify-end items-end p-5">
                <Button onClick={
                    () => {
                        getContent();
                        console.log("clicked");
                    }
                } text="Refresh" startIcon={<Refresh size="size-5" />} />
            </div>

        </div>
    );
}