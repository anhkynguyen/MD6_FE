import { initializeApp } from "@firebase/app";
import { getStorage } from "@firebase/storage";
const firebaseConfig = {
  apiKey: "AIzaSyCGl4QitF0a5dyxBPpkrSvmRh0zuVHvSeA",
  authDomain: "blog-510b1.firebaseapp.com",
  projectId: "blog-510b1",
  storageBucket: "blog-510b1.appspot.com",
  messagingSenderId: "249561359587",
  appId: "1:249561359587:web:0a7d1acacc037ba8b751d6",
  measurementId: "G-429V3LBDHR",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app);
