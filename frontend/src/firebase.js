import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDRN9eltP4ubecWUJxofDDXZcosG-Cr6u8",
    authDomain: "dealy-b0d0f.firebaseapp.com",
    projectId: "dealy-b0d0f",
    storageBucket: "dealy-b0d0f.firebasestorage.app",
    messagingSenderId: "640226278028",
    appId: "1:640226278028:web:e3f4e59ea3decce80f59a9",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export { auth, googleProvider, signInWithPopup };
