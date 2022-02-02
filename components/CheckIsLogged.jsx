import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { auth, db } from "../firebase";
import { userToFind } from "../src/utils";

const CheckIsLogged = ({ children, pageTitle }) => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  useEffect(() => {
    const isLogged = () => {
      onAuthStateChanged(auth, (currentUser) => {
        currentUser
          ? userToFind(currentUser.email, setUser)
          : router.push("/login");
      });
    };
    return isLogged();
  }, []);

  console.log(user);

  return <div>{children}</div>;
};

export default CheckIsLogged;
