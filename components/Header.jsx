import Image from "next/image";
import { SearchIcon, HomeIcon, MenuIcon } from "@heroicons/react/solid";
import {
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  ChevronUpIcon,
} from "@heroicons/react/outline";
import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useRecoilState, useRecoilValue } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { userState } from "../atoms/userAtom";
import { menuState } from "../atoms/menuAtom";
import { closePopUp, useAuth } from "../src/utils";
import ShowMenu from "../components/ShowMenu";

const Header = () => {
  const [showPopper, setShowPopper] = useState(false);
  const [showMenu, setShowMenu] = useRecoilState(menuState);
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const Ref = useRef(null);
  const router = useRouter();
  const user = useRecoilValue(userState);
  const auth = useAuth();

  useEffect(() => {
    const clickOutside = (event) => {
      closePopUp(event, showPopper, Ref, setShowPopper);
    };
    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [showPopper]);

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      {/* // *Logo  */}
      <div className="flex justify-between max-w-4xl mx-5 xl:mx-auto">
        <div
          onClick={() => router.push("/")}
          className="relative hidden lg:inline-grid w-24 cursor-pointer"
        >
          <Image
            src={"https://links.papareact.com/ocw"}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div
          onClick={() => router.push("/")}
          className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer"
        >
          <Image
            src={"https://links.papareact.com/jjm"}
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* // * Search bar  */}
        <div className="relative m-3 rounded-md">
          <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-400" />
          </div>
          <input
            className="bg-gray-100 block w-full pl-10 sm:text-sm transition delay-100 border-gray-100 focus:ring-0 focus:border-gray-100 rounded-md"
            type="text"
            placeholder="Search"
          />
        </div>

        {/* // * Nav section */}
        <div className="flex items-center justify-end space-x-5">
          <MenuIcon
            className="h-6 md:hidden cursor-pointer"
            onClick={() => setShowMenu(!showMenu)}
          />
          <ShowMenu />

          {user ? (
            <>
              <HomeIcon onClick={() => router.push("/")} className="navBtn" />
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div
                  className="absolute -top-2 -right-2 text-xs w-5 h-5
            bg-red-500 rounded-full flex items-center justify-center text-white"
                >
                  3
                </div>
              </div>
              <PlusCircleIcon
                onClick={() => setOpenModal(true)}
                className="navBtn"
              />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />

              <div className="relative">
                <img
                  src="sugookun.png"
                  alt="profile-pic"
                  className="h-6 rounded-full cursor-pointer"
                  onClick={() => setShowPopper(!showPopper)}
                />
                {showPopper ? (
                  <div
                    id="popper"
                    className="flex flex-col w-max absolute bg-white shadow-md p-5 mt-4 -left-11"
                    ref={Ref}
                  >
                    <div className="relative">
                      <ChevronUpIcon className="absolute -top-11 left-5 w-8 stroke-gray-600" />
                      <button className="btnBlue">View Profile</button>
                      <div>
                        <button
                          onClick={() => auth.signout()}
                          className="btnBlue"
                        >
                          Sign Out
                        </button>
                      </div>
                    </div>
                  </div>
                ) : null}
              </div>
            </>
          ) : (
            <button onClick={signIn}>Sign In</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
