// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyCLqLGOMk_m-XOs6XVgfjRIMtJtn1ad-3w",
    authDomain: "safespaceai-forkids-1e943.firebaseapp.com",
    projectId: "safespaceai-forkids-1e943",
    storageBucket: "safespaceai-forkids-1e943.firebasestorage.app",
    messagingSenderId: "861279841152",
    appId: "1:861279841152:web:56c2ac4ae3711cd74c2f65",
    measurementId: "G-Z5XESKQEL7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

export { app, analytics, db, storage, auth };