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
import emailState from "../atoms/emailAtom";
import { userState } from "../atoms/userAtom";
import loadingState from "../atoms/loadingAtom";
import { auth, db } from "../firebase";
import postPicture from "../atoms/postPicture";

export const useClosePopUp = () => {
  const [selectedPicture, setSelectedPicture] = useRecoilState(postPicture);

  const closePopUp = (e, statePopUp, Ref, setPopUp) => {
    if (statePopUp && Ref.current && !Ref.current.contains(e.target)) {
      setPopUp(!statePopUp);
      setSelectedPicture(null);
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
  const [registerEmail, setRegisterEmail] = useRecoilState(emailState);
  const [loading, setLoading] = useRecoilState(loadingState);

  useEffect(() => {
    onAuthStateChanged(auth, (currrentUser) => {
      if (currrentUser) {
        autho.userToFind(currrentUser.email);
        setRegisterEmail(currrentUser.email);
      } else {
        loading && setLoading(!loading);
      }
    });
  }, []);
};

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState);
  const [registerEmail, setRegisterEmail] = useRecoilState(emailState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const router = useRouter();

  const userToFind = async (userEmail) => {
    const docToFind = doc(db, "users", userEmail);
    const userFounded = await getDoc(docToFind);

    if (userFounded.exists()) {
      setUser(userFounded.data());
      loading && setLoading(!loading);
    } else {
      setRegisterEmail(userEmail);
      router.push("/register");
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
      const result = await signInWithPopup(auth, provider);
      const userEmail = result.user.email;
      await userToFind(userEmail);
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(GoogleAuthProvider.credentialFromError(error));
    }
  };

  const signout = async () => {
    try {
      setUser(null);
      setRegisterEmail("");
      await signOut(auth);
    } catch (error) {
      console.log(error);
    }
  };

  const signup = async (userEmail, fullname, username, password) => {
    try {
      if (registerEmail.length > 0) {
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
