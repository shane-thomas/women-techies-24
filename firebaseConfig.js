import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";


const firebaseConfig = {
  apiKey: "AIzaSyD5960zRGCkdFdYlL62z41u2sH5-98Nzuc",
  authDomain: "women-techies-24.firebaseapp.com",
  projectId: "women-techies-24",
  storageBucket: "women-techies-24.appspot.com",
  messagingSenderId: "734955422127",
  appId: "1:734955422127:web:71fbf4e86d57684ecfef5a",
  measurementId: "G-GPM7LWRNBM",
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
