import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import currentUserState from "../atoms/currentUserState";
import { userState } from "../atoms/userAtom";
import loadingState from "../atoms/loadingAtom";
import { auth, db } from "../firebase";

export const useClosePopUp = () => {
  const closePopUp = (e, Modal, Ref, fun) => {
    if (Modal && Ref.current && !Ref.current.contains(e.target)) {
      fun();
    }
  };

  return { closePopUp };
};

export const createUser = async (userEmail, fullname, username) => {
  await setDoc(doc(db, "users", userEmail), {
    name: fullname,
    username: username,
    email: userEmail,
  });
};

export const useIfLogged = () => {
  const autho = useAuth();
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [loading, setLoading] = useRecoilState(loadingState);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        autho.userToFind(currentUser.email);
        setCurrentUser([{ email: currentUser.email, uid: currentUser.uid }]);
      } else {
        loading && setLoading(false);
      }
    });
  }, [loading]);
};

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const [currentUser, setCurrentUser] = useRecoilState(currentUserState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const router = useRouter();

  const userToFind = async (userEmail) => {
    const docToFind = doc(db, "users", userEmail);
    const userFounded = await getDoc(docToFind);

    if (userFounded.exists()) {
      setUser(userFounded.data());
    } else {
      return null;
    }
    // else {
    //   // setCurrentUser(userEmail);
    //   router.push("/register");
    // }
  };

  const signout = async () => {
    try {
      setUser(null);
      setCurrentUser(null);
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const signinEmailAndPassword = async (email, password) => {
    try {
      const user = await signInWithEmailAndPassword(auth, email, password);
      await userToFind(user.email);
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  const signinPopUp = async (provider) => {
    try {
      if (currentUser && !user) {
        signout();
      }
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;
      const luck = await userToFind(userEmail);
      if (luck === null) {
        router.push("/register");
      }
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(GoogleAuthProvider.credentialFromError(error));
    }
  };

  const signup = async (userEmail, fullname, username, password) => {
    try {
      if (currentUser.length > 0) {
        createUser(userEmail, fullname, username);
        await userToFind(userEmail);
      } else {
        const userCreated = await createUserWithEmailAndPassword(
          auth,
          userEmail,
          password
        );
        createUser(userCreated.user.email, fullname, username);
        await userToFind(userCreated.user.email);
      }
    } catch (error) {
      console.log(error);
      console.log(error.message);
      console.error("Error adding document: ", error);
    }
  };

  return { userToFind, signinPopUp, signinEmailAndPassword, signup, signout };
};
