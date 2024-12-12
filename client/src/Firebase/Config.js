// Import the functions you need from the SDKs
import { initializeApp } from "firebase/app";
// Remove the Firebase Analytics import
// import { getAnalytics } from "firebase/analytics";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import { getStorage } from "firebase/storage";
import { getAuth } from "firebase/auth";

// Firebase configuration
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
// Remove Analytics initialization
// const analytics = getAnalytics(app);
const db = getFirestore(app);
const storage = getStorage(app);
const auth = getAuth(app);

// Export Firebase services
export { app, db, storage, auth, collection, addDoc };
