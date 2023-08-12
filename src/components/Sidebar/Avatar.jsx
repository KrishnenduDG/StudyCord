// icons
import {Calendar} from "lucide-react"

// Global imports
import React from 'react'
import { useAuth0 } from "@auth0/auth0-react";


function Avatar() {
    const { user } = useAuth0();
    // const format = { year: "numeric" , month: "long"  , day:"numeric"};
    // const JoiningDate = user.updated_at.toLocaleString('default', format);

  return (
    <div className="font-Semibold  flex flex-row gap-2">
    <img src={user.picture} className='w-12 aspect-square rounded-full relative' />
    <div id='ActiveState' className='absolute bottom-3 left-4 bg-green-600 w-4 h-4 rounded-full shadow-green-500 shadow-md'></div>
    <div className=''>
        <p className='text-neutral-200 text-lg'>{user.name}</p>
        <p className='font-light text-neutral-400 text-sm flex flex-row gap-1'>This is Description</p>
    </div>
    
    </div>
  )
}

export default Avatar