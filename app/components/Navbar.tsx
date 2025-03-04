"use client";
import Plus from "../icons/Plus";
import Share from "../icons/Share";
import Button from "./Button";

import Brain from "../icons/Brain";
import { redirect } from "next/navigation";
import Signout from "../icons/Signout";
import { signOut } from "next-auth/react";
import Menu from "../icons/Menu";
import { useState } from "react";
import Cross from "../icons/Cross";

interface NavbarProps {
    openAddContentModal?: () => void;
    openShareContentModal?: () => void;
    public?: boolean,
    name?: string
}
export default function Navbar(props: NavbarProps) {
    const [openMenu, setOpenMenu] = useState(false);



    return (
        <>
            <div className="flex justify-between items-center px-2 py-4 w-screen">
                <div onClick={() => { redirect("/") }} className="text-3xl font-semibold flex justify-center items-center gap-2 cursor-pointer">
                    <Brain size="size-12" />
                    Second Brain
                </div>

                {!props.public &&
                    <>
                        <div className="sm:flex gap-3 hidden">
                            <Button onClick={() => {
                                props.openAddContentModal?.();
                            }} text="Add Content" startIcon={<Plus size="size-5" />} work="addContent" />
                            <Button onClick={() => {
                                props.openShareContentModal?.();
                            }} text="Share Content" startIcon={<Share size="size-4" />} work="shareBrain" />
                            <Button onClick={() => signOut()} text="Sign Out" startIcon={<Signout size="size-5" />} authButton={true} isSession={true} work="signOut" />
                        </div>
                        <div className="sm:hidden" onClick={() => { setOpenMenu(!openMenu) }}>
                            <Menu size='size-8' />
                        </div>
                    </>
                }
                {props.public &&
                    <div className="uppercase font-serif sm:text-lg text-xs font-bold">
                        {props.name}'s Brain
                    </div>}
            </div>
            {openMenu &&
                <div className="fixed left-0 top-0 h-screen w-screen  z-50 bg-black/85">

                    <div onClick={() => { setOpenMenu(false) }} className="flex justify-end p-3 text-white">
                        <Cross size="size-9" />
                    </div>

                    <div className="flex flex-col gap-8 justify-center items-center opacity-100 text-white m-4 pt-20">
                        <Button onClick={() => {
                            props.openAddContentModal?.();
                            setOpenMenu(false);
                        }} text="Add Content" startIcon={<Plus size="size-5" />} work="addContent" />
                        <Button onClick={() => {
                            props.openShareContentModal?.();
                            setOpenMenu(false);
                        }} text="Share Content" startIcon={<Share size="size-4" />} work="shareBrain" />
                        <Button onClick={() => signOut()} text="Sign Out" startIcon={<Signout size="size-5" />} authButton={true} isSession={true} work="signOut" />

                    </div>
                </div>
            }
        </>
    )
}