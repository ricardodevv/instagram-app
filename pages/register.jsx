import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState, useRecoilValue } from "recoil";
import emailState from "../atoms/emailAtom";
import { userState } from "../atoms/userAtom";
import { useAuth } from "../src/utils";
import CheckIsLogged from "../components/CheckIsLogged";

const register = () => {
  const router = useRouter();
  const registerEmail = useRecoilValue(emailState);
  const [user, setUser] = useRecoilState(userState);
  const [disabledButton, setDisabledButton] = useState(true);
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const auth = useAuth();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const handleEmailOnChange = (e) => {
    e.preventDefault();
    setUserEmail(e.target.value);
  };

  const handleFullNameOnChange = (e) => {
    e.preventDefault();
    setFullName(e.target.value);
  };

  const handleUsernameOnChange = (e) => {
    e.preventDefault();
    setUsername(e.target.value);
  };

  const handlePasswordOnChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  if (disabledButton) {
    if (
      registerEmail.length > 0 ||
      password.length > 0 ||
      fullname.length > 0 ||
      username.length > 0
    ) {
      setDisabledButton(!disabledButton);
    }
  } else {
    if (
      registerEmail.length === 0 &&
      password.length === 0 &&
      fullname.length === 0 &&
      username.length === 0
    ) {
      setDisabledButton(!disabledButton);
    }
  }

  const signUpFirebase = async (e, email, fullname, username, password) => {
    e.preventDefault();
    auth.signup(email, fullname, username, password);
  };

  return (
    <CheckIsLogged pageTitle="register">
      <div className="flex flex-col bg-gray-50 w-screen h-screen items-center justify-center">
        <div className="bg-white border border-gray-200">
          <div className="flex flex-col items-center w-[21rem] p-8">
            <div className="relative flex w-48 h-20">
              <Image
                src={"https://links.papareact.com/ocw"}
                layout="fill"
                objectFit="contain"
              />
            </div>
            <p className="text-center text-gray-500 text-lg font-medium">
              Sign up to see photos and videos from your friends.
            </p>
            <form className="mt-5 w-full">
              <div className="relative">
                <input
                  name="email"
                  value={registerEmail}
                  type="text"
                  placeholder="Email"
                  className="w-full h-[2.3rem] border-gray-300 rounded-[4px] placeholder:text-sm"
                  onChange={(e) => handleEmailOnChange(e)}
                />
              </div>
              <div>
                <input
                  name="fullname"
                  value={fullname}
                  type="text"
                  placeholder="Full name"
                  className="inputForm"
                  onChange={(e) => handleFullNameOnChange(e)}
                />
              </div>
              <div>
                <input
                  name="username"
                  value={username}
                  type="text"
                  placeholder="Username"
                  className="inputForm"
                  onChange={(e) => handleUsernameOnChange(e)}
                />
              </div>
              <div>
                <input
                  name="password"
                  value={password}
                  type="password"
                  placeholder="Password"
                  className="inputForm"
                  onChange={(e) => handlePasswordOnChange(e)}
                />
              </div>

              <button
                className={`w-full py-1 mt-3 bg-blue-600 text-white rounded-md width ${
                  disabledButton ? "bg-blue-200 pointer-events-none" : null
                }`}
                onClick={(e) =>
                  signUpFirebase(e, registerEmail, fullname, username, password)
                }
              >
                Sign Up
              </button>
            </form>
          </div>
        </div>
        <div className="flex text-sm justify-center bg-white border border-gray-200 w-[21rem] p-2 mt-3">
          <p>You do have an account?</p>
          <Link href="/login">
            <a className="ml-1 text-blue-500 font-medium cursor-pointer">
              Sign in
            </a>
          </Link>
        </div>
      </div>
    </CheckIsLogged>
  );
};

export default register;
