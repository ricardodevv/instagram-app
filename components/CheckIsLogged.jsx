import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { auth, db } from "../firebase";

const CheckIsLogged = ({ children }) => {
  const [user, setUser] = useRecoilState(userState);
  const router = useRouter();

  // console.log(user.name);

  const userToFind = async (userEmail) => {
    const docToFind = doc(db, "users", userEmail);
    const docSnap = await getDoc(docToFind);

    if (docSnap.exists()) {
      setUser(docSnap.data());
    }
  };

  useEffect(() => {
    const isLogged = () => {
      onAuthStateChanged(auth, (currentUser) => {
        console.log(currentUser);
        if (currentUser) {
          userToFind(currentUser.email);
        } else {
          router.push("/login");
        }
      });
    };
    return isLogged();
  }, []);

  return <div>{user ? <div>{children}</div> : null}</div>;
};

export default CheckIsLogged;
