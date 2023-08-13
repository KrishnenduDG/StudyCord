import { getDoc, onSnapshot, orderBy, query, where } from "@firebase/firestore";
import { useState, useEffect,useRef } from "react";
import { useParams } from "react-router";
import { chatsCollectionRef } from "../config/collectionRef";
import { ChatsServiceInstance } from "../services/";
import { useAuth0 } from "@auth0/auth0-react";

const RoomChatPage = () => {
  let { id } = useParams();
  const [messages, setMessages] = useState([]);
  const {user,isAuthenticated} = useAuth0();

  const chatRef = useRef();

  const handleChatSubmit = async (e) => {
    e.preventDefault();

    await ChatsServiceInstance.addChat(chatRef.current.value,id,user.sub,user.name);
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
    <div className="ml-96">
      {messages.map((m, idx) => {
        console.log(m.msg);
        return (
          <div key={idx} className="bg-red-900">
            {m.msg}
          </div>
        );
      })}

      <div>
        <form onSubmit={handleChatSubmit}>
          <input type="text"  ref={chatRef} />
          <button type="submit" className="bg-red-900 text-white p-3">Chat</button>
        </form>
      </div>
    </div>
  );
};

export default RoomChatPage;
