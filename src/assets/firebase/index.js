/* eslint-disable no-unused-vars */
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
const firebaseConfig = {
    apiKey: "AIzaSyBXngi_sKHAt-Ajrx8FH8KEnreLBPBCmgc",
    authDomain: "library-app-ed056.firebaseapp.com",
    projectId: "library-app-ed056",
    storageBucket: "library-app-ed056.appspot.com",
    messagingSenderId: "849633772252",
    appId: "1:849633772252:web:958a8b9a691bc91448aa19",
    measurementId: "G-3VH0EJS3EQ"
  };
  const app = initializeApp(firebaseConfig);

  let db = getFirestore(app);
  let auth = getAuth(app);

  export {db,auth}