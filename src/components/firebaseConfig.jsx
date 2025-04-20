// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDxti0S6kIxO60zzTV1p_oGkBRznEqvfAs",
    authDomain: "my-images-hosting.firebaseapp.com",
    projectId: "my-images-hosting",
    storageBucket: "my-images-hosting.appspot.com",
    messagingSenderId: "355916865120",
    appId: "1:355916865120:web:9b3d7d08d347105fc1ed05"
  };
 
  

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

export { storage };