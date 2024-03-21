
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCgzsIFVKWCuxmKv5AebEJNtcXc4UxIolo",
  authDomain: "banking-8574e.firebaseapp.com",
  projectId: "banking-8574e",
  storageBucket: "banking-8574e.appspot.com",
  messagingSenderId: "118318055634",
  appId: "1:118318055634:web:ad6758e656af8217a52d0b",
  measurementId: "G-EDZ09NTBRD"
};


 export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);