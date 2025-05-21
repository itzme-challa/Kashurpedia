import { auth } from "./firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  updateProfile
} from "firebase/auth";

export const register = async (email, password, username) => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await updateProfile(userCredential.user, { displayName: username });
};

export const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password);
};

export const resetPassword = async (email) => {
  await sendPasswordResetEmail(auth, email);
};

export const logout = () => signOut(auth);
