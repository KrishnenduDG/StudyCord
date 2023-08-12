import { collection } from "firebase/firestore";
import { db } from "./firebase";

export const roomsCollectionRef = collection(db, "rooms");
export const chatsCollectionRef = collection(db,"chats");