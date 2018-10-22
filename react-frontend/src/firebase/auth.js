import { auth } from './firebase';
import axios from "axios";

export const doCreateUserWithEmailAndPassword = (email, password) =>
  auth.createUserWithEmailAndPassword(email, password);

// Sign In
export const doSignInWithEmailAndPassword = (email, password) =>
  auth.signInWithEmailAndPassword(email, password);

// Sign out
export const doSignOut = () => {
  auth.signOut();
  window.location.reload();
}
export const getCurrentUser = () => {
  return auth.currentUser;
}

