import React from "react";
import DropdownSelect from "react-select/creatable";
// icons
import { PlusCircle } from 'lucide-react';

export default function Modal() {
    const [showModal, setShowModal] = React.useState(false);
    return (
        <>
            <button className='border-dotted border-2 rounded-full px-4 py-1 b-neutral-300 flex flex-row justify-between items-center gap-2 text-white text-xl'
                type="button"
                onClick={() => setShowModal(true)}
            >
                <PlusCircle size={21} /> create
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className="relative w-auto my-6 mx-auto max-w-2xl ">

                            {/*content*/}
                            <form>
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-zinc-800">
                                    {/*header*/}
                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-500 rounded-t">
                                        <h3 className="text-lg font-semibold text-neutral-300">
                                            Create Your Room
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-black opacity-5 float-right text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <span className=" text-red-600 opacity-5 h-6 w-6 text-2xl block outline-none focus:outline-none">
                                                ×
                                            </span>
                                        </button>
                                    </div>
                                    {/*body*/}
                                    <div className="relative p-6 flex-auto">
                                        <p className="my-4 text-slate-500 text-lg leading-relaxed">
                                            <input type="file"/>
                                            <input type="text" />
                                            <textarea />
                                            <DropdownSelect isMulti />
                                        </p>
                                    </div>
                                    {/*footer*/}
                                    <div className="flex items-center justify-end p-3 border-t border-solid border-slate-500 rounded-b">
                                        <button
                                            className="text-red-500 background-transparent font-bold uppercase px-6 py-1 text-sm outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Cancel
                                        </button>
                                        <button
                                            className="bg-blue-500 text-white active:bg-emerald-600 font-bold uppercase text-sm px-6 py-2 rounded-md shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                                            type="button"
                                            onClick={() => setShowModal(false)}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="opacity-25 fixed inset-0 z-40 bg-black"></div>
                </>
            ) : null
            }
        </>
    );
}