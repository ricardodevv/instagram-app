import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { auth } from "../firebase";
import { useAuth } from "../src/utils";
import emailState from "../atoms/emailAtom";

const CheckIsLogged = ({ children, pageTitle }) => {
  const [user, setUser] = useRecoilState(userState);
  const [registerEmail, setRegisterEmail] = useRecoilState(emailState);
  const router = useRouter();
  const autho = useAuth();

  useEffect(() => {
    onAuthStateChanged(auth, (currrentUser) => {
      if (currrentUser && !user) {
        autho.userToFind(currrentUser.email);
        setRegisterEmail(currrentUser.email);
      }
    });
  }, [user]);

  return <div>{children}</div>;
};

export default CheckIsLogged;
