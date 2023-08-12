import { getDoc,onSnapshot,orderBy,query,where } from "@firebase/firestore";
import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { chatsCollectionRef } from "../config/collectionRef";
import { ChatsServiceInstance } from "../services/";

const RoomChatPage = () => {
  let { id } = useParams();
  const [messages,setMessages] = useState([]);

  useEffect(() => {
        const queryRef = query(
          chatsCollectionRef,
          where("room_id", "==", id),
        );

    const unsubscribe = onSnapshot(queryRef,(qs) => {
        let messages_array = [];

        qs.forEach((doc) => {
            messages_array.push({...doc.data(), id:doc.id})
        });

        setMessages(messages_array.map((msg => msg.chats))[0])
    })

    return () => unsubscribe();
  }, []);

  return <div className="ml-96">
    {messages.map((m,idx) => {console.log(m.msg); return <div key = {idx} className="bg-red-900">{m.msg}</div>}
    )}
  </div>;
};

export default RoomChatPage;
