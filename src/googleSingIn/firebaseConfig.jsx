/** @format */

import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "@firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDNoi5KItC35l1-65npZSUTnRxe7qDKbSQ",
  authDomain: "trello-app-f9f67.firebaseapp.com",
  projectId: "trello-app-f9f67",
  storageBucket: "trello-app-f9f67.appspot.com",
  messagingSenderId: "534582155810",
  appId: "1:534582155810:web:0ab0b13abc159369cd087b",
  measurementId: "G-RFP1FRE4RN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

const provider = new GoogleAuthProvider();
const db = getFirestore(app);

export { auth, provider, db };
