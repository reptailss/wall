
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";



const firebaseConfig = {
    apiKey: "AIzaSyDP9QXdULojHK9RvBuweCvL0M5CCF--BDs",
    authDomain: "blog-f279e.firebaseapp.com",
    projectId: "blog-f279e",
    storageBucket: "blog-f279e.appspot.com",
    messagingSenderId: "76947304396",
    appId: "1:76947304396:web:bf2ce53b810d7d69e1f769",
    measurementId: "G-7EX09DRXK4"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth();
export const storage = getStorage(app);