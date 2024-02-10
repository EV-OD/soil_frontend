import "./App.css";

import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import React from "react";
import Home from "./pages/home";
// https://firebase.google.com/docs/web/setup#available-libraries

const firebaseConfig = {
  apiKey: "AIzaSyCITbn7Mh9QPGlKQEE16SSBHP8ad9bzOAQ",
  authDomain: "soil-d5d51.firebaseapp.com",
  databaseURL: "https://soil-d5d51-default-rtdb.firebaseio.com",
  projectId: "soil-d5d51",
  storageBucket: "soil-d5d51.appspot.com",
  messagingSenderId: "788849542944",
  appId: "1:788849542944:web:840c0c00350fd4eea63945",
  measurementId: "G-MYGYLG66ER",
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const AppProvider = React.createContext(app);

function App() {
  return (
    <AppProvider.Provider value={app}>
      <Home />
    </AppProvider.Provider>
  );
}

export default App;
