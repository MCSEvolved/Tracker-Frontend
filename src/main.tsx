import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import Layout from './Layout.tsx'
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: "AIzaSyBlfZjJyhjcgyPfxaqkZHSR5SciFBWC5IY",
  authDomain: "mcsynergy-55878.firebaseapp.com",
  projectId: "mcsynergy-55878",
  storageBucket: "mcsynergy-55878.appspot.com",
  messagingSenderId: "822930182678",
  appId: "1:822930182678:web:23e8f0b3e044ae06cb9b37",
  measurementId: "G-3BK4KLMGTJ"
};

initializeApp(firebaseConfig);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Layout />
  </React.StrictMode>,
)
