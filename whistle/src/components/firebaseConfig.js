// src/firebaseConfig.js

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyDeXX_4KCKBOoe4577V45v09bBme5nxC8w",
  authDomain: "whistle-fea26.firebaseapp.com",
  projectId: "whistle-fea26",
  storageBucket: "whistle-fea26.appspot.com",
  messagingSenderId: "810504372889",
  appId: "1:810504372889:web:c31315dde9130a3ad92e08",
  measurementId: "G-XKSMCLPPN2"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { auth, db, storage };
