import React from 'react'
import SideBarLinks from "../Sidebar/SideBarMenu"
function Sidebar() {


    return (
        <aside className="fixed left-0 w-72 h-screen transition-transform bg-neutral-800 sm:-translate-x-0 -z-10">
            <div>
                <div className="flex items-center justify-center my-4">
                    <span className="text-neutral-300 text-lg">Sidebar</span>
                </div>

                <SideBarLinks />

            </div>
        </aside>
    )
}

export default Sidebar