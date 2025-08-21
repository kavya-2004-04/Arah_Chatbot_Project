// firebase-config.js
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-firestore.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/9.22.2/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyDH_3UGj-L5uXvyzi_ZVOHTe5aUgK04_wA",
  authDomain: "arah-infotech.firebaseapp.com",
  projectId: "arah-infotech",
  storageBucket: "arah-infotech.firebasestorage.app",
  messagingSenderId: "837702113257",
  appId: "1:837702113257:web:d0da910799db6f19041d78",
  measurementId: "G-JD1G9LQ3KD"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };

