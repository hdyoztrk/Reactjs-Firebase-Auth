import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "complete the required fields",
  authDomain: "complete the required fields",
  projectId: "complete the required fields",
  storageBucket: "complete the required fields",
  messagingSenderId: "complete the required fields",
  appId: "complete the required fields",
};

export const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
