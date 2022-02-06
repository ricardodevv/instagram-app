import { GoogleAuthProvider } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilValue } from "recoil";
import loadingState from "../atoms/loadingAtom";
import { userState } from "../atoms/userAtom";
import CheckIsLogged from "../components/CheckIsLogged";
import { useAuth, useIfLogged } from "../src/utils";
import phoneImg from "../phoneImages";
import Head from "next/head";

const login = () => {
  const [changeImg, setChangeImg] = useState(0);
  const [disabledSignIn, setDisabledSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const user = useRecoilValue(userState);
  const loading = useRecoilValue(loadingState);
  const provider = new GoogleAuthProvider();
  const router = useRouter();
  const auth = useAuth();
  const redirectIfLogged = useIfLogged();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  useEffect(() => {
    const interval = setInterval(() => {
      changeImg !== 4 ? setChangeImg(changeImg + 1) : setChangeImg(0);
    }, 4500);
    return () => clearInterval(interval);
  }, [changeImg]);

  const handleEmailOnChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
  };

  const handlePasswordOnChange = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  if (disabledSignIn) {
    if (email.length > 0 || password.length > 0) {
      setDisabledSignIn(!disabledSignIn);
    }
  } else {
    if (email.length === 0 && password.length === 0) {
      setDisabledSignIn(!disabledSignIn);
    }
  }

  const signInEmail = (e, email, password) => {
    e.preventDefault();
    auth.signinEmailAndPassword(email, password);
  };

  const signInGoogle = () => {
    auth.signinPopUp(provider);
  };

  return (
    <CheckIsLogged>
      <Head>
        <title>Instagram</title>
      </Head>
      {!loading && !user ? (
        <div className="flex w-screen justify-center items-center bg-gray-50">
          <article className="flex mt-4 justify-around">
            <div className="relative min-w-8 hidden md:inline-grid">
              <img src="https://www.instagram.com/static/images/homepage/home-phones.png/43cc71bb1b43.png" />
              {phoneImg.map((el) => (
                <img
                  key={el.id}
                  src={el.url}
                  className={`absolute top-[6.2rem] left-[9.5rem] transition-opacity duration-[1500ms] ease-in ${
                    el.id !== changeImg ? "opacity-0" : "opacity-100"
                  }`}
                />
              ))}
            </div>
            <div>
              <div className="flex flex-col mt-8 p-8 border border-gray-300 items-center bg-white">
                <div className="relative flex w-44 h-24">
                  <Image
                    src="/instagramlogo.png"
                    layout="fill"
                    objectFit="contain"
                  />
                </div>
                <form action="" className="mt-5 w-64">
                  <div className="relative">
                    <input
                      name="username"
                      value={email}
                      type="text"
                      placeholder="Username"
                      className="w-full border-gray-300 rounded-[4px] placeholder:text-sm"
                      onChange={(e) => handleEmailOnChange(e)}
                    />
                  </div>
                  <div>
                    <input
                      name="password"
                      value={password}
                      type="password"
                      placeholder="Password"
                      className="w-full border-gray-300 rounded-[4px] placeholder:text-sm mt-1.5"
                      onChange={(e) => handlePasswordOnChange(e)}
                    />
                  </div>

                  <button
                    className={`w-full py-1 mt-2 bg-blue-600 text-white rounded-md width ${
                      disabledSignIn ? "bg-blue-300 pointer-events-none" : null
                    }`}
                    onClick={(e) => signInEmail(e, email, password)}
                  >
                    Sign In
                  </button>
                </form>
                <div className="relative">
                  <hr className="w-64 border-gray-400 my-6" />
                  <p className="absolute top-3 left-[105px] text-gray-400 bg-white px-4">
                    O
                  </p>
                </div>
                <button
                  onClick={() => signInGoogle()}
                  className="flex relative w-64 p-1.5 border border-gray-400 rounded-md justify-center"
                >
                  <p className="mr-2 text-gray-600">Sign in with Google</p>
                  <div className="w-6 h-6 relative">
                    <Image
                      src="/googleicon.svg"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </button>

                <div className="flex mt-6 text-sm">
                  <p className="">Don't have an account yet?</p>
                  <Link href="/register">
                    <a className="ml-1 text-blue-500 font-medium cursor-pointer">
                      Sign up
                    </a>
                  </Link>
                </div>
              </div>
            </div>
          </article>
        </div>
      ) : null}
    </CheckIsLogged>
  );
};

export default login;
