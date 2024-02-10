import { useContext, useEffect, useState } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";
import { AppProvider } from "../App";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";

const useApp = () => {
  const app = useContext(AppProvider);
  const auth = getAuth(app);
  const db = getDatabase(app);
  return { app, auth, db };
};

export default useApp;
