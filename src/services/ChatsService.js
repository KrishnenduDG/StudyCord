import { chatsCollectionRef } from "../config/collectionRef";
import { query, where, getDocs,getDoc } from "firebase/firestore";

class ChatsService {
  async getChatsCollectionByRoomId(room_id) {
    const ds = await getDoc(chatsCollectionRef, queryRef)
    const res = [];
    ds.forEach((d) => {
        res.push(d.data())
    });
    return res[0];
  }
}

export default ChatsService;
