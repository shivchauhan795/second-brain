"use client"
import { redirect } from "next/navigation";
import Brain from "../icons/Brain";
import Button from "./Button";
import { useState } from "react";
import Menu from "../icons/Menu";
import Cross from "../icons/Cross";

export default function HomeNavbar() {
    const [isModelOpen, setIsModelOpen] = useState(false);
    return (
        <>
            <div className="w-screen flex justify-between items-center px-6 py-5">
                <div className="flex sm:justify-center justify-between items-center sm:gap-2 sm:text-3xl text-xl font-semibold">
                    <Brain size="size-15" />Second Brain
                </div>
                <div className="sm:flex gap-3 hidden">
                    <Button text="SIGN IN" task={"moveToSignIn"} />
                    <Button text="SIGN UP" task={"moveToSignUp"} />
                    <Button text="CONTRIBUTE" onClick={() => redirect("https://github.com/shivchauhan795/second-brain")} />
                </div>
                <div className="sm:hidden" onClick={() => { setIsModelOpen(!isModelOpen) }}>
                    <Menu size="size-8" />
                </div>
            </div>
            <div>
                {isModelOpen &&
                    <div className="flex flex-col gap-3 sm:hidden fixed top-0 left-0 bg-black/85 text-white h-screen w-screen justify-center items-center">
                        <div onClick={() => { setIsModelOpen(!isModelOpen) }} className="absolute top-6 right-6">
                            <Cross size="size-8" />
                        </div>
                        <div className="flex flex-col gap-4 justify-center items-center">

                            <Button text="SIGN IN" task={"moveToSignIn"} />
                            <Button text="SIGN UP" task={"moveToSignUp"} />
                            <Button text="CONTRIBUTE" onClick={() => redirect("https://github.com/shivchauhan795/second-brain")} />
                        </div>
                    </div>
                }
            </div>
        </>
    )
}