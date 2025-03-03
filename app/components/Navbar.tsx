import Plus from "../icons/Plus";
import Share from "../icons/Share";
import Button from "./Button";

import Brain from "../icons/Brain";
import { redirect } from "next/navigation";
import Signout from "../icons/Signout";
import { signOut } from "next-auth/react";

interface NavbarProps {
    openAddContentModal?: () => void;
    openShareContentModal?: () => void;
    public?: boolean,
    name?: string
}
export default function Navbar(props: NavbarProps) {
    return (
        <div className="flex justify-between items-center px-10 py-4 ">
            <div onClick={() => { redirect("/") }} className="text-2xl font-semibold flex justify-center items-center gap-2 cursor-pointer">
                <Brain size="size-10" />
                Second Brain
            </div>

            {!props.public &&
                <div className="flex gap-3">
                    <Button onClick={() => {
                        props.openAddContentModal?.();
                    }} text="Add Content" startIcon={<Plus size="size-5" />} work="addContent" />
                    <Button onClick={() => {
                        props.openShareContentModal?.();
                    }} text="Share Content" startIcon={<Share size="size-4" />} work="shareBrain" />
                    <Button onClick={() => signOut()} text="Sign Out" startIcon={<Signout size="size-5" />} authButton={true} isSession={true} work="signOut" />
                </div>
            }
            {props.public &&
                <div className="text-white uppercase font-serif text-lg">
                    {props.name}'s Brain
                </div>}
        </div>
    )
}