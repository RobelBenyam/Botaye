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
  userData: { displayName: string }
) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );
    await updateProfile(userCredential.user, {
      displayName: userData.displayName,
    });
    // Save user data to Firestore with role and assignedProperties
    await setDoc(doc(db, "users", userCredential.user.uid), {
      uid: userCredential.user.uid,
      name: userData.displayName,
      email,
      role: "property_manager",
      assignedProperties: [],
    });
    return userCredential.user;
  } catch (error) {
    console.log("error happened", error);
    throw error;
  }
};
