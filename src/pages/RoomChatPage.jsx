import { getDoc, onSnapshot, orderBy, query, where } from "@firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { chatsCollectionRef } from "../config/collectionRef";
import { ChatsServiceInstance } from "../services/";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

//icons
import { Send, FilePlus, AlertTriangle, Info } from "lucide-react"


const RoomChatPage = () => {
    let { id } = useParams();
    const [messages, setMessages] = useState([]);
    const { user, isAuthenticated } = useAuth0();
    const [illegalChat, setIllegalChat] = useState(false);
    const [toDisable, setToDisable] = useState(false);
    const chatRef = useRef();



    const handleChatSubmit = async (e) => {
        setIllegalChat(false);
        e.preventDefault();
        setToDisable(true);
        let res = await axios.get(
            `https://api.api-ninjas.com/v1/profanityfilter?text=${chatRef.current.value}`,
            {
                headers: {
                    "X-Api-Key": "eDiOFN4AjUJ1DUGr5wQtIg==SOgAyUSPTflLn3Kf",
                },
            }
        );

        res = await res.data;
        console.log(res);

        if (res["has_profanity"]) {
            setIllegalChat(true);
            console.log("hit");
            setToDisable(false);
        }

        if (res["has_profanity"] === false) {
            await ChatsServiceInstance.addChat(
                chatRef.current.value,
                id,
                user.sub,
                user.name,
                user.picture,
                new Date().toLocaleTimeString()
            );
            chatRef.current.value = "";
            setToDisable(false);
        }


    };

    useEffect(() => {
        const queryRef = query(chatsCollectionRef, where("room_id", "==", id));

        const unsubscribe = onSnapshot(queryRef, (qs) => {
            let messages_array = [];

            qs.forEach((doc) => {
                messages_array.push({ ...doc.data(), id: doc.id });
            });

            setMessages(messages_array.map((msg) => msg.chats)[0]);
        });

        return () => unsubscribe();
    }, []);

    return (
        <div className="relative max-h-[86vh] overflow-hidden flex flex-col gap-2 mr-2 ml-80">
            <div className="absolute right-5">
                <Info className="peer ml-2 w-5 text-neutral-600 hover:text-neutral-400" />
                <div className="absolute hidden peer-hover:flex hover:flex  flex-col bg-zinc-800 drop-shadow-lg p-3 border-[0.5px] border-neutral-400
                         text-neutral-400 rounded-lg w-64 top-0 right-10
                        ">
                    {id}
                </div>
            </div>

            <div className="min-h-[76vh] overflow-scroll mb-3">
                <div className={` auto flex flex-col 
                ${messages.length === 0 ? "justify-center items-center" : "justify-between"}
                    `}>
                    {messages.length === 0 ? (
                        <div className="flex flex-col justify-center items-center text-3xl text-white font-light">
                            No Chats Yet
                            <p className="text-lg text-white font-light">for Room id:</p>
                            <p className="text-lg text-white font-light">{id}</p>

                        </div>) :

                        (messages.map((m, idx) => {
                            // console.log(m);
                            // console.log(user.id,m.sender_id,user.id === m.sender_id);
                            return (
                                <div key={idx} className={`${user.sub === m.sender_id ?
                                    "bg-slate-800" :
                                    "bg-slate-700"} mb-2  w-1/2 rounded-lg`}>
                                    <div className="m-2 flex flex-row gap-2 font-semibold text-neutral-200 text-sm">
                                        <img src={m.avatar} className='w-6 aspect-square rounded-full relative' />
                                        {m.sender_name}
                                        <p className="ml-auto">{m.time}</p>
                                    </div>
                                    <p className="px-3 pb-3 text-neutral-200" >{m.msg}</p>
                                </div>
                            );
                        }))
                    }
                </div>

            </div>


            <div className="sticky bottom-0 relative">
                <form onSubmit={handleChatSubmit} className=" flex flex-row gap-2">
                    <button className="text-white"> <FilePlus size={24} /> </button>
                    <input type="text" ref={chatRef}
                        className="relative w-full bg-transparent pr-7 pl-3 py-2 rounded-md border-[2px] border-dashed border-neutral-400 outline-dashed focus:border-white text-white
                        outline-transparent"
                    />
                    <button type="submit" className=" text-white p-3  absolute right-3 " disabled={toDisable}><Send /></button>
                </form>
                {illegalChat && <p className="absolute -top-5 text-red-500 flex flex-row gap-2"><AlertTriangle />Your are not allowed to Send Vulgar Text Contents </p>}
            </div>
        </div>
    );
};

export default RoomChatPage;
