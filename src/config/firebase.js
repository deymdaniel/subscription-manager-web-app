// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFAAnfInPaFfPD06VCuK1Vit9o2OC2d3g",
  authDomain: "subscription-manager-48363.firebaseapp.com",
  projectId: "subscription-manager-48363",
  storageBucket: "subscription-manager-48363.firebasestorage.app",
  messagingSenderId: "702974178880",
  appId: "1:702974178880:web:104bc7de4f9312f43c51a5",
  measurementId: "G-80HENZMHGM",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);

// Initialize Cloud Firestore and get a reference to the service
export const db = getFirestore(app);

// Initialize Analytics (optional)
const analytics = getAnalytics(app);

export default app;
