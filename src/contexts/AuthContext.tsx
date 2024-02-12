import {
  User,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
} from "firebase/auth";

import React, { ReactNode, useEffect, useState } from "react";
import { auth } from "../lib/firebase";

interface ContextState {
  user: User | null;
  logOut: () => Promise<void>;
  loginWithPassword: (email: string, password: string) => Promise<void>;
  signUpUserWithEmailAndPassword: (
    email: string,
    password: string
  ) => Promise<void>;
}
const FirebaseAuthContext = React.createContext<ContextState | undefined>(
  undefined
);

export const FirebaseAuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (!user) {
        setUser(null);
      }
      setUser(user);
      setLoading(false);
    });

    return unsubscribe;
  }, []);

  const loginWithPassword = async (email: string, password: string) => {
    await signInWithEmailAndPassword(auth, email, password);
  };

  const signUpUserWithEmailAndPassword = async (
    email: string,
    password: string
  ) => {
    await createUserWithEmailAndPassword(auth, email, password);
  };

  const logOut = async () => {
    await signOut(auth);
  };

  const value = {
    user,
    logOut,
    loginWithPassword,
    signUpUserWithEmailAndPassword,
  };
  return (
    <FirebaseAuthContext.Provider value={value}>
      {!loading && children}
    </FirebaseAuthContext.Provider>
  );
};

export const useFirebaseAuth = () => {
  const context = React.useContext(FirebaseAuthContext);
  if (context === undefined) {
    throw new Error(
      "useFirebaseAuth must be used within a FirebaseAuthProvider"
    );
  }
  return context; // Return the entire context here.
};
