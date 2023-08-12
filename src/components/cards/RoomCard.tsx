import React from 'react'

//icons
import {ShieldAlert, Users} from "lucide-react"

//Local component import
import Badges from "./badges"

function RoomCard() {
    return (
        <div className="w-64 rounded-md bg-zinc-800 p-4 py-3">
            <div>
                <img src="https://images.pexels.com/photos/147411/italy-mountains-dawn-daybreak-147411.jpeg?auto=compress&cs=tinysrgb&w=600"
                    className='rounded-md w-full object-cover h-24' />
                <p className='mt-3 text-white text-lg '> Room Name</p>
                <p className="mt-2 text-sm text-neutral-400 flex flrex-row gap-2 items-center "><Users size={16}/> Members : 8</p>
                <div className='flex flex-wrap mt-2 px-3'>
                    <Badges />
                </div>

                <p className="mt-4 text-neutral-400 flex flrex-row gap-1 items-center "><ShieldAlert size={18}/>Created by Saptarshi </p>
            </div>


        </div>
    )
}

export default RoomCard