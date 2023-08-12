// Global imports
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

// icons
import { LogIn, LogOut } from 'lucide-react';

//Local imports
import Avatar from "./Sidebar/Avatar";


function Navbar() {
    const { user, isAuthenticated, loginWithRedirect, logout } = useAuth0();

    return (
        <div className="sticky top-0 w-full bg-zinc-700 z-20 shadow-sm shadow-neutral-600 py-3 border-b-[1px]">
            
            <div className="flex flex-row items-center justify-between gap-3 md:gap-0 mx-5">
                {isAuthenticated && <div className="">
                    <Avatar/>
                </div>}
                <nav>
                    <div className="">
                        {!isAuthenticated ? (
                            <button
                                className="rounded-full
                                hover:opacity-80
                                bg-grey-800
                                font-bold
                                text-neutral-200
                                p-1 px-4
                                border-1
                                flex flex-row gap-3 items-center"
                                onClick={() => loginWithRedirect()}>
                                <LogIn size={18} />
                                Log In
                            </button>
                        ) : (
                            <button
                                className="rounded-full
                            hover:opacity-80
                            bg-grey-800
                            font-bold
                            text-neutral-200
                            p-1 px-4
                            border-1
                            flex flex-row gap-3 items-center"
                                onClick={() => logout()}>
                                <LogOut />
                                Log Out</button>
                        )}
                    </div>

                </nav>
            </div>

        </div>
    );
}

export default Navbar;
