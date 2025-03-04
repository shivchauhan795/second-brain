"use client";
import { useEffect, useState } from "react";
import Card from "../../components/Card";
import { useParams } from "next/navigation";
import Navbar from "@/app/components/Navbar";

interface Content {
    id?: string,
    title?: string,
    link?: string,
    type?: "youtube" | "twitter"
}
export default function Page() {
    const [data, setdata] = useState([]);
    const [name, setName] = useState("");
    const params = useParams();
    const brainId = params.brainId;

    useEffect(() => {
        getContent();
    }, []);

    async function getContent() {
        try {
            const response = await fetch(`/api/v1/getSharedBrain?brainId=${brainId}`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",

                },
            });
            const data = await response.json();
            setName(data.data.name);
            setdata(data.data.content);
        } catch (e) {
            console.log(e);
        }
    }

    return (
        <div className="bg-purple-300 h-screen w-screen text-black overflow-auto pb-10">
            <Navbar public={true} name={name} />
            <div className="flex flex-wrap justify-center pt-10 gap-6">

                {data && data.map((item?: Content) => {
                    return (
                        <Card key={item?.id} id={item?.id ?? ""} title={item?.title ?? ""} link={item?.link ?? ""} type={item?.type ?? "twitter"} public={true} />
                    )
                })}

            </div>
            {data && data.length === 0 && <div className="text-2xl flex justify-center items-center pt-20">No Content Found</div>}

        </div>
    );
}