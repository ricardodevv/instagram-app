import { signOut } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";

export const logOut = async (setUser) => {
  try {
    setUser(null);
    await signOut(auth);
  } catch (error) {
    console.log(error);
  }
};

export const closePopUp = (e, statePopUp, Ref, setPopUp) => {
  statePopUp && Ref.current && !Ref.current.contains(e.target)
    ? setPopUp(!statePopUp)
    : null;
};

export const createUser = async (userEmail, fullname, username, setUser) => {
  await setDoc(doc(db, "users", userEmail), {
    name: fullname,
    username: username,
    email: userEmail,
  });
  userToFind(userEmail, setUser);
};

export const userToFind = async (userEmail, setUser) => {
  const docToFind = doc(db, "users", userEmail);
  const docSnap = await getDoc(docToFind);

  if (docSnap.exists()) {
    setUser(docSnap.data());
  } else {
    console.log("No such user registered!");
  }
};
