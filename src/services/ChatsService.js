import { chatsCollectionRef } from "../config/collectionRef";
import { db } from "../config/firebase";
import { query, where, getDocs,getDoc,doc,updateDoc } from "firebase/firestore";
import { useRef } from "react";

class ChatsService {
  async addChat(chat,room_id, id,name){
    const queryRef = query(chatsCollectionRef, where("room_id", "==", room_id));
    const ds = await getDocs(queryRef);

    let res = [];

    ds.forEach((doc) => res.push({id:doc.id,data:doc.data()}));

    const chatRef = doc(db,`chats/${res[0].id}`);
    const chats_array = res[0].data.chats;
    
    // console.log([...members_arr, user_id]);

        try {
          const res = await updateDoc(chatRef, {
            chats: [...chats_array,{sender_id:id,sender_name:name,msg:chat}],
          });

          return { status: true };
        } catch (error) {
          console.log(error);
          return { status: false };
        }

  }
}

export default ChatsService;
