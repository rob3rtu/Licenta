import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { OAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

export const firebaseConfig = {
  apiKey: "AIzaSyB6mTEwhaWLK0od7nz3Q8HkmfJFld7O8UU",
  authDomain: "licenta-fmi.firebaseapp.com",
  projectId: "licenta-fmi",
  storageBucket: "licenta-fmi.appspot.com",
  messagingSenderId: "1041916442718",
  appId: "1:1041916442718:web:b205ced93335b8b6cb9ccf",
};

//for email auth
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//for microsoft auth
const MSprovider = new OAuthProvider("microsoft.com");

export const firestore = getFirestore(app);

export const storage = getStorage(app);

export default MSprovider;
