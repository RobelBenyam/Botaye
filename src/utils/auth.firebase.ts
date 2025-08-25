import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";

import { auth, db } from "./firebaseConfig";
import { doc, setDoc } from "firebase/firestore";

export const firebaseSignIn = async (email: string, password: string) => {
  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    console.log(res, res);
    return res.user;
  } catch (error) {
    throw error;
  }
};

export const firebaseLogout = async () => {
  try {
    await auth.signOut();
  } catch (error) {
    throw error;
  }
};

export const firebaseSignUp = async (
  email: string,
  password: string,
  userData: any
) => {
  try {
    const user = await createUserWithEmailAndPassword(auth, email, password);
    await updateProfile(user.user, {
      displayName: userData.displayName,
    });
    // await setDoc(doc(db, "users", user.user.uid), {
    //   ...userData,
    //   uid: user.user.uid,
    // });
    return user.user;
  } catch (error) {
    console.log("erro happend", error);
    throw error;
  }
};
