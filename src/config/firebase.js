import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from "firebase/auth"
import {getFirestore} from "firebase/firestore";
import {getStorage} from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyAjuP0VHkXlGuNTCJHrQKLO16XHb_EaP1k",
  authDomain: "studycord-3c283.firebaseapp.com",
  projectId: "studycord-3c283",
  storageBucket: "studycord-3c283.appspot.com",
  messagingSenderId: "311645018458",
  appId: "1:311645018458:web:9649983e0374773a443b63",
  measurementId: "G-GP8RLV5ZPS",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);


// Getting Firestore
export const db = getFirestore(app);

// Getting the Storage
export const storage = getStorage(app);