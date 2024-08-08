import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB-XN0EpkL93y-cDpe7G6tFoDGJzYWGulI",
    authDomain: "pocket-keeper-4e1c2.firebaseapp.com",
    projectId: "pocket-keeper-4e1c2",
    storageBucket: "pocket-keeper-4e1c2.appspot.com",
    messagingSenderId: "479259648374",
    appId: "1:479259648374:web:19263b49a75cdc5eda1a57",
    measurementId: "G-QKLM8DRTTG"
}

const app = initializeApp(firebaseConfig);

const db = getFirestore(app);

export { db, app };