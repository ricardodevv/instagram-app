import { signOut } from "firebase/auth";
import { auth } from "../firebase";

export const logOut = async (user, setUser) => {
  try {
    await signOut(auth);
    setUser(null);
  } catch (error) {
    console.log(error);
  }
};

export const closePopUp = (e, statePopUp, Ref, setPopUp) => {
  statePopUp && Ref.current && !Ref.current.contains(e.target)
    ? setPopUp(!statePopUp)
    : null;
};
