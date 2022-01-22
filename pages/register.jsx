import Image from "next/image";
import { useState } from "react";

const register = () => {
  const [disabledSignIn, setDisabledSignIn] = useState(true);
  const [email, setEmail] = useState("");
  const [fullname, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailOnChange = (e) => {
    e.preventDefault();
    setEmail(e.target.value);
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

  if (disabledSignIn) {
    if (
      email.length > 0 ||
      password.length > 0 ||
      fullname.length > 0 ||
      username.length > 0
    ) {
      setDisabledSignIn(!disabledSignIn);
    }
  } else {
    if (
      email.length === 0 &&
      password.length === 0 &&
      fullname.length === 0 &&
      username.length === 0
    ) {
      setDisabledSignIn(!disabledSignIn);
    }
  }

  return (
    <div className="flex bg-gray-50 w-screen h-screen items-center justify-center">
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
          <form
            action=""
            onSubmit={() => signInFirebase(email, password)}
            className="mt-5 w-full"
          >
            <div className="relative">
              <input
                name="email"
                value={email}
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
                disabledSignIn ? "bg-blue-200 pointer-events-none" : null
              }`}
            >
              Sign Up
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default register;
