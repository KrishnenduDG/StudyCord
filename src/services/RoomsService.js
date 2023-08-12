import { db,storage } from "../config/firebase.js";
import { getDocs, query, where,addDoc } from "@firebase/firestore";
import {ref,uploadBytes,getDownloadURL,} from "firebase/storage";

import { roomsCollectionRef } from "../config/collectionRef.js";
import { v4 as uuidv4 } from "uuid";

class RoomsService {
  async getRoomsByUser(id) {
    const queryRef = query(
      roomsCollectionRef,
      where("members", "array-contains", id)
    );
    const ds = await getDocs(roomsCollectionRef, queryRef);

    let res = [];

    ds.forEach((doc) => {
      res.push({ id: doc.id, data: doc.data() });
    });

    return res;
  }

  async addRoom(roomObj) {
    const { name, desc, tags, img, owner_id,owner_name } = roomObj;

    const id = uuidv4();

    const storageRef = ref(storage, `rooms/${id}/${img.name}`);

     try {
       await uploadBytes(storageRef, img);
       const pic_url = await getDownloadURL(storageRef);

         const res = await addDoc(roomsCollectionRef,{
           room_id: id,
           name,
           desc,
           img: pic_url,
           tags:tags.map((tag) => tag.label),
           members: [owner_id],
           owner_id,
           owner_name
         });

       return { status: "True", id };
     } catch (error) {
        console.log(error);
      return {status:"False"};
    }
  }
  }


export default RoomsService;
