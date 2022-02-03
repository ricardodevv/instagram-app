import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import emailState from "../atoms/emailAtom";
import { userState } from "../atoms/userAtom";
import CheckIsLogged from "../components/CheckIsLogged";
import { auth } from "../firebase";
import { userToFind } from "../src/utils";

const login = () => {
  const [changeImg, setChangeImg] = useState(0);
  const [disabledSignIn, setDisabledSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useRecoilState(userState);
  const [registerEmail, setRegisterEmail] = useRecoilState(emailState);
  const provider = new GoogleAuthProvider();
  const router = useRouter();

  useEffect(() => {
    if (user) {
      router.push("/");
    }
  }, [user]);

  const phoneImg = [
    {
      id: 0,
      url: "https://www.instagram.com/static/images/homepage/screenshot1.jpg/d6bf0c928b5a.jpg",
    },
    {
      id: 1,
      url: "https://www.instagram.com/static/images/homepage/screenshot2.jpg/6f03eb85463c.jpg",
    },
    {
      id: 2,
      url: "https://www.instagram.com/static/images/homepage/screenshot3.jpg/f0c687aa6ec2.jpg",
    },
    {
      id: 3,
      url: "https://www.instagram.com/static/images/homepage/screenshot4.jpg/842fe5699220.jpg",
    },
    {
      id: 4,
      url: "https://www.instagram.com/static/images/homepage/screenshot5.jpg/0a2d3016f375.jpg",
    },
  ];

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

  const signInEmail = async (e, email, password) => {
    e.preventDefault();
    try {
      const userCredentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      console.log(userCredentials);
      setUser(userCredentials);
      router.push("/");
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
    }
  };

  const signInGoogle = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const userLogged = result.user.email;
      const logger = await userToFind(userLogged, setUser);

      console.log(logger.exists());

      if (logger.exists()) {
        setUser(logger.data());
      } else {
        setUser(null);
      }
      // } else {
      //   setRegisterEmail(userLogged);
      //   router.push("/register");
      // }
    } catch (error) {
      console.log(error.code);
      console.log(error.message);
      console.log(error.email);
      console.log(GoogleAuthProvider.credentialFromError(error));
    }
  };

  return (
    <CheckIsLogged pageTitle="login">
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
    </CheckIsLogged>
  );
};

export default login;
