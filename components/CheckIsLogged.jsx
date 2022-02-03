import { onAuthStateChanged } from "firebase/auth";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { auth } from "../firebase";
import { userToFind } from "../src/utils";
import emailState from "../atoms/emailAtom";

const CheckIsLogged = ({ children, pageTitle }) => {
  const [user, setUser] = useRecoilState(userState);
  const [registerEmail, setRegisterEmail] = useRecoilState(emailState);
  const router = useRouter();

  useEffect(() => {
    const isLogged = () => {
      onAuthStateChanged(auth, async (currentUser) => {
        if (currentUser) {
          const logger = await userToFind(currentUser.email, setUser);

          if (logger.exists()) {
            setUser(logger.data());
          } else {
            setRegisterEmail(currentUser.email);
            router.push("/register");
          }
        } else {
          pageTitle !== "register" && router.push("/login");
        }
      });
    };
    return isLogged();
  }, []);

  return <div>{children}</div>;
};

export default CheckIsLogged;
