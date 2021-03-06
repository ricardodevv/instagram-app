import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import ProfilePicture from "../components/ProfilePicture";
import CheckIsLogged from "../components/CheckIsLogged";
import Layout from "../components/Layout";
import Link from "next/link";
import { useState } from "react";
import {
  BookmarkIcon,
  PhotographIcon,
  TagIcon,
} from "@heroicons/react/outline";
import { collection, getDocs, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect } from "react";
import { HeartIcon } from "@heroicons/react/solid";

const profile = ({ posts }) => {
  const user = useRecoilValue(userState);
  const [activeToggle, setActiveToggle] = useState(1);
  const [userPosts, setUserPosts] = useState([]);

  useEffect(() => {
    user && setUserPosts(posts.filter((el) => el.username === user.username));
  }, [user, posts]);

  const toggleSection = [
    {
      name: "POSTS",
      icon: <PhotographIcon />,
      id: 1,
      posts: userPosts,
    },
    {
      name: "SAVED",
      icon: <BookmarkIcon />,
      id: 2,
      posts: [{ image: "derek.jpg" }],
    },
    { name: "TAGS", icon: <TagIcon />, id: 3, posts: userPosts },
  ];

  const toggleToShow = toggleSection.find((el) => el.id === activeToggle);
  console.log(toggleToShow);

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
              <div className="flex space-x-28">
                {toggleSection.map((toggle) => (
                  <div key={toggle.id}>
                    <button
                      className={`mt-[-1px] py-2 border-t border-gray-300 transition ease-in ${
                        activeToggle === toggle.id
                          ? "border-t border-gray-700"
                          : null
                      }`}
                      onClick={(e) => handleToggleClick(e, toggle)}
                    >
                      <div className="flex space-x-3 items-center">
                        <div
                          className={`w-5 ${
                            activeToggle === toggle.id
                              ? "text-black"
                              : "text-gray-700"
                          }`}
                        >
                          {toggle.icon}
                        </div>
                        <p
                          className={`text-sm text-gray-700 font-medium ${
                            activeToggle === toggle.id
                              ? "text-black"
                              : "text-gray-700"
                          }`}
                        >
                          {toggle.name}
                        </p>
                      </div>
                    </button>
                  </div>
                ))}
              </div>
            </div>
            <div id="lol" className="grid grid-cols-3 auto-rows-[250px] gap-4">
              {toggleToShow.posts.map((el) => (
                <div key={el.id} className="group relative cursor-pointer">
                  <div className="absolute w-full h-full bg-black opacity-70 hidden group-hover:flex"></div>
                  <div className="absolute w-full h-full hidden group-hover:flex justify-center">
                    <HeartIcon className="text-white w-14" />
                  </div>
                  <img
                    src={el.image}
                    alt="post image"
                    className="w-full h-full object-contain bg-white"
                  />
                </div>
              ))}
            </div>
          </div>
        ) : null}
      </Layout>
    </CheckIsLogged>
  );
};

export default profile;

export const getServerSideProps = async () => {
  const q = query(collection(db, "posts"));
  const querySnapshot = await getDocs(q);

  let luck = querySnapshot.docs.map((el) => el.data());
  for (const key in luck) {
    luck[key].timestamp = { ...luck[key].timestamp };
  }

  return {
    props: { posts: luck },
  };
};
