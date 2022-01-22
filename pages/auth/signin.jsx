import { signInWithEmailAndPassword } from "firebase/auth";
import { getProviders, signIn as signInProviders } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../../firebase";

const signIn = ({ providers }) => {
  const [changeImg, setChangeImg] = useState(0);
  const [disabledSignIn, setDisabledSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

  const signInFirebase = async (email, password) => {
    try {
      const credentials = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      const user = credentials.user;
    } catch (error) {
      const errorCode = error.code;
      const errorMessage = error.message;
    }
  };

  return (
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
            <form
              action=""
              onSubmit={() => signInFirebase(email, password)}
              className="mt-5 w-64"
            >
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
                className={`w-full py-2 mt-2 bg-blue-600 text-white rounded-md width ${
                  disabledSignIn ? "bg-blue-300 pointer-events-none" : null
                }`}
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
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <button
                  onClick={() => signInProviders(provider.id)}
                  className="flex relative w-64 p-2 border border-gray-400 rounded-md justify-center"
                >
                  <p className="mr-2 text-gray-600">
                    Sign in with {provider.name}
                  </p>
                  <div className="w-6 h-6 relative">
                    <Image
                      src="/googleicon.svg"
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </button>
              </div>
            ))}
            <Link href="/register">
              <p className="mt-4 text-sm">
                Don't have an account yet?{" "}
                <a className="text-blue-500 font-medium cursor-pointer">
                  Sign up
                </a>
              </p>
            </Link>
          </div>
        </div>
      </article>

      {/* {Object.values(providers).map((provider) => (
        <div key={provider.name}>
          <button onClick={() => signInProviders(provider.id)}>
            Sign in with {provider.name}
          </button>
        </div>
      ))} */}
    </div>
  );
};

export const getServerSideProps = async () => {
  const providers = await getProviders();

  return {
    props: {
      providers,
    },
  };
};

export default signIn;
