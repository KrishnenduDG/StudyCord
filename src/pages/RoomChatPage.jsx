import { getDoc, onSnapshot, orderBy, query, where } from "@firebase/firestore";
import { useState, useEffect, useRef } from "react";
import { useParams } from "react-router";
import { chatsCollectionRef } from "../config/collectionRef";
import { ChatsServiceInstance } from "../services/";
import { useAuth0 } from "@auth0/auth0-react";
import axios from "axios";

//icons
import { Send , FilePlus } from "lucide-react"


const RoomChatPage = () => {
    let { id } = useParams();
    const [messages, setMessages] = useState([]);
    const { user, isAuthenticated } = useAuth0();
    const [illegalChat,setIllegalChat] = useState(false);
    const [toDisable,setToDisable] = useState(false);
    const chatRef = useRef();



    const handleChatSubmit = async (e) => {
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

              res["has_profanity"] ? setIllegalChat(true) : null;

        await ChatsServiceInstance.addChat(
            chatRef.current.value,
            id,
            user.sub,
            user.name,
            user.picture,
            new Date().toLocaleTimeString()
        );
        chatRef.current.value = ""
        setToDisable(false);

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
        <div className="max-h-[86vh] overflow-hidden flex flex-col gap-2 mr-2 ml-80">
            <div className="min-h-[76vh] overflow-scroll mb-3">
                <div className={` auto flex flex-col 
                ${messages.length === 0 ? "justify-center items-center" : "justify-between"}
                    `}>
                    {messages.length === 0 ? (<div className="justify-center items-center text-3xl text-white font-light">
                        No Chats Yet
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

            <div className="sticky bottom-0 flex flex-row gap-2">
                <form onSubmit={handleChatSubmit}>
                    <input type="file" placeholder={<FilePlus />} className="text-white"/>
                    <input type="text" ref={chatRef} 
                        className="relative w-full bg-transparent pr-7 pl-3 py-2 rounded-md border-[2px] border-dashed border-neutral-400 outline-dashed focus:border-white text-white
                        outline-transparent"
                    />
                    <button type="submit" className=" text-white p-3  absolute right-5 " disabled={illegalChat || toDisable}><Send /></button>
                </form>

                {illegalChat && <h1>We have detected profanity in your message.. Be Respectful and polite in the chat.. </h1>}
            </div>
        </div>
    );
};

export default RoomChatPage;
