import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  // ✅ Paste your actual config from Firebase Console here
    apiKey: "AIzaSyDsQL5l-pNx_hz4H-J7RY81tGl5qKpiLqY",
    authDomain: "groceriq.firebaseapp.com",
    projectId: "groceriq",
    storageBucket: "groceriq.firebasestorage.app",
    messagingSenderId: "495413107202",
    appId: "1:495413107202:web:f7964c6e83cb5e0fb9651b"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
