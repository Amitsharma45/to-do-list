import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyCAqsYh0CZyIh2uOEzaDx_HMTdjS4kSQ5c",
  authDomain: "to-do-list-aeb99.firebaseapp.com",
  projectId: "to-do-list-aeb99",
  storageBucket: "to-do-list-aeb99.appspot.com",
  messagingSenderId: "318913360493",
  appId: "1:318913360493:web:e7117eb04e431ce5144564",
  measurementId: "G-SPN3M135KM"
};


const fire = initializeApp(firebaseConfig);

export default fire;
