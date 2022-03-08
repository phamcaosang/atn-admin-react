// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBkO_LgWRVCZrP2tMwtPTvxvXMCQT_jB-I",
  authDomain: "shop-cbe4c.firebaseapp.com",
  projectId: "shop-cbe4c",
  storageBucket: "shop-cbe4c.appspot.com",
  messagingSenderId: "220392555544",
  appId: "1:220392555544:web:00cf7dae7107b596c5ef6d",
  measurementId: "G-E1BC0EDC41"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export default app;