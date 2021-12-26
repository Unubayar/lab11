
import { initializeApp } from "firebase/app";
import { getFirestore, getDocs, collection, onSnapshot } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyBW6ACUYaIj8wDz__TohRWAQOc5K8DHH1s",
    authDomain: "helloworld-d1742.firebaseapp.com",
    projectId: "helloworld-d1742",
    storageBucket: "helloworld-d1742.appspot.com",
    messagingSenderId: "1065664426606",
    appId: "1:1065664426606:web:e74b4aa0478a4727e7ec7f",
    measurementId: "G-5NSVGDV42B"
};
const app = initializeApp(firebaseConfig);
export const fireStore = getFirestore(app);