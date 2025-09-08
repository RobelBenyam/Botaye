import React, {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import { firebaseSignIn, firebaseSignUp } from "../utils/auth.firebase";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../utils/firebaseConfig";

export interface User {
  id: string;
  name: string;
  email: string;
  role: "superadmin" | "property_manager";
  assignedProperties?: string[]; // IDs of properties assigned to the manager
}

interface AuthContextValue {
  user: User | null;
  isAuthenticated: boolean;
  signIn: (email: string, password: string) => Promise<void>;
  signUp: (name: string, email: string, password: string) => Promise<void>;

  signOut: () => void;
  resetPassword: (email: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const stored = localStorage.getItem("auth.user");
    if (stored) setUser(JSON.parse(stored));
  }, []);

  const isAuthenticated = !!user;
  const signIn = async (email: string, _password: string) => {
    const loggedUser = await firebaseSignIn(email, _password);
    console.log(loggedUser);

    // Fetch user data from Firestore after login
    // Import these at the top: import { doc, getDoc } from "firebase/firestore"; import { db } from "../utils/firebaseConfig";
    const userDocRef = doc(db, "users", loggedUser.uid);
    const userDocSnap = await getDoc(userDocRef);

    if (userDocSnap.exists()) {
      const userData = userDocSnap.data();
      const userObj: User = {
        id: loggedUser.uid,
        name: userData.name,
        email: userData.email,
        role: userData.role,
        assignedProperties: userData.assignedProperties || [],
      };
      setUser(userObj);
      localStorage.setItem("auth.user", JSON.stringify(userObj));
    } else {
      // fallback if user doc not found
      const fallbackUser: User = {
        id: loggedUser.uid,
        name: loggedUser.displayName || "",
        email,
        role: "property_manager", // or default role
      };
      setUser(fallbackUser);
      localStorage.setItem("auth.user", JSON.stringify(fallbackUser));
    }
  };
  const signUp = async (name: string, email: string, _password: string) => {
    const userCredential = await firebaseSignUp(email, _password, {
      displayName: name,
    });
    console.log(userCredential);
    const userObj: User = {
      id: userCredential.uid,
      name,
      email,
      role: "property_manager",
    };
    setUser(userObj);
    localStorage.setItem("auth.user", JSON.stringify(userObj));
  };

  const signOut = () => {
    setUser(null);
    localStorage.removeItem("auth.user");
  };

  const resetPassword = async (_email: string) => {
    await new Promise((r) => setTimeout(r, 300));
  };

  const value = useMemo(
    () => ({ user, isAuthenticated, signIn, signUp, signOut, resetPassword }),
    [user, isAuthenticated]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
