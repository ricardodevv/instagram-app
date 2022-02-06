import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import ProfilePicture from "../components/ProfilePicture";
import CheckIsLogged from "../components/CheckIsLogged";
import Layout from "../components/Layout";
import Link from "next/link";
import { useState } from "react";

const profile = () => {
  const user = useRecoilValue(userState);
  const toggleSection = [
    { name: "POSTS", id: 1 },
    { name: "SAVED", id: 2 },
    { name: "TAGS", id: 3 },
  ];
  const [activeToggle, setActiveToggle] = useState(1);

  const handleToggleClick = (e, toggle) => {
    setActiveToggle(toggle.id);
  };

  return (
    <CheckIsLogged>
      <Layout pageTitle="Instagram - Profile">
        {user ? (
          <div
            className="mx-auto md:max-w-3xl 
          xl:max-w-4xl"
          >
            <div className="flex flex-row mt-8 mb-12">
              <div className="w-20 h-20 rounded-full overflow-hidden mx-10 md:w-36 md:h-36 bg-white">
                <ProfilePicture />
              </div>
              <div className="flex flex-col ml-14 space-y-5">
                <div className="flex flex-row items-center space-x-14">
                  <div className="text-gray-700 text-3xl font-light">
                    {user.username}
                  </div>
                  <Link href="/account">
                    <button className="h-max border rounded-md py-[5px] px-[8px] text-sm font-semibold text-gray-800">
                      Edit profile
                    </button>
                  </Link>
                </div>
                <div className="flex space-x-14">
                  <h3>
                    <span className="font-medium text-gray-800">10</span> posts
                  </h3>
                  <h3>
                    <span className="font-medium text-gray-800">10,000</span>{" "}
                    followers
                  </h3>
                  <h3>
                    <span className="font-medium text-gray-800">15,000</span>{" "}
                    followed
                  </h3>
                </div>
                <p className="font-semibold text-gray-800">{user.name}</p>
              </div>
            </div>
            <div className="flex justify-center w-full border-t border-gray-300 my-6">
              <div className="flex space-x-20">
                {toggleSection.map((toggle) => (
                  <button
                    key={toggle.id}
                    className={`mt-[-1px] border-t border-gray-300 ${
                      activeToggle === toggle.id
                        ? "border-t border-black"
                        : null
                    }`}
                    onClick={(e) => handleToggleClick(e, toggle)}
                  >
                    {toggle.name}
                  </button>
                ))}
              </div>
            </div>
          </div>
        ) : null}
      </Layout>
    </CheckIsLogged>
  );
};

export default profile;