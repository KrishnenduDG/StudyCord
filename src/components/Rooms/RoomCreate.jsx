import { useEffect, useRef, useState } from "react";

import DropdownSelect from "react-select/creatable";
// icons
import { PlusCircle, X } from "lucide-react";
import { Navigate, useNavigate } from "react-router";
import { RoomsServiceInstance } from "../../services";
import { useAuth0 } from "@auth0/auth0-react";


const RoomsCreate = () => {
    const { user } = useAuth0();
    const navigate = useNavigate();

    const nameRef = useRef();
    const descRef = useRef();
    const tagsRef = useRef();
    const [img, setImg] = useState("");
    const [showModal, setShowModal] = useState(false);

    const [selectedTags, setSelectedTags] = useState([]);

    const handleTagChange = (options) => setSelectedTags(options);

    const handleSubmit = async (e) => {
        e.preventDefault();

        const res = await RoomsServiceInstance.addRoom({
            name: nameRef.current.value,
            desc: descRef.current.value,
            tags: selectedTags,
            img,
            owner_id: user.sub,
            owner_name: user.name
        });

        if (res.status) {
            setShowModal(false);
            navigate(`/room/${res.id}`);
        } else {
            alert("Something Went Wrong!")
        }
    };

    return (
        <>
            <button
                className="border-dotted border-2 rounded-full px-4 py-1 b-neutral-300 flex flex-row justify-between items-center gap-2 text-white text-xl"
                type="button"
                onClick={() => setShowModal(true)}
            >
                <PlusCircle size={21} /> Create Room
            </button>
            {showModal ? (
                <>
                    <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none ">
                        <div className="relative w-auto my-6 mx-auto max-w-lg ">

                            <form onSubmit={handleSubmit}>
                                <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full outline-none focus:outline-none bg-zinc-800">

                                    <div className="flex items-start justify-between p-5 border-b border-solid border-slate-500 rounded-t">
                                        <h3 className="text-lg font-semibold text-neutral-300">
                                            Create Your Room
                                        </h3>
                                        <button
                                            className="p-1 ml-auto bg-transparent border-0 text-red-500   text-3xl leading-none font-semibold outline-none focus:outline-none"
                                            onClick={() => setShowModal(false)}
                                        >
                                            <X />
                                        </button>
                                    </div>
                                    <div className=" p-6 flex flex-col">
                                        <p className="my-4 text-slate-500 text-lg flex flex-col gap-3">
                                            <input className="block w-full text-lg text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-transparent dark:text-gray-400 focus:outline-none dark:bg-transparent dark:border-gray-600 dark:placeholder-gray-400"
                                                accept="image/*"
                                                type="file" />

                                            <input
                                                type="text"
                                                placeholder="Room Name"
                                                ref={nameRef}
                                                className="bg-transparent p-3 rounded-md border-[1px] border-neutral-400 focus:outline-white focus:border-zinc-500"
                                            />
                                            <textarea
                                                placeholder="Room Description"
                                                ref={descRef}
                                                className="bg-transparent p-3 text-sm rounded-md border-[1px] border-neutral-400 focus:outline-white focus:border-zinc-500"
                                            />
                                            <DropdownSelect
                                                isMulti
                                                onChange={handleTagChange}
                                                className="bg-transparent p-3 rounded-md border-[1px] border-neutral-400 focus:outline-white focus:border-zinc-500"
                                            />
                                        </p>
                                    </div>
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
                                            type="submit"
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
            ) : null}
        </>
    );
};

export default RoomsCreate;
