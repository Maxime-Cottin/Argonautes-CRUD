import firebase from "firebase/compat/app";
import { getFirestore } from "@firebase/firestore";

const app = firebase.initializeApp({
	apiKey: process.env.REACT_APP_API_KEY,
	authDomain: process.env.REACT_APP_PROJECT_ID + ".firebaseapp.com",
	projectId: process.env.REACT_APP_PROJECT_ID,
	storageBucket: process.env.REACT_APP_PROJECT_ID + ".appspot.com",
	messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
	appId: process.env.REACT_APP_APP_ID,
});

export const firestore = getFirestore(app);
export default app;
