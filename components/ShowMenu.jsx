import { useEffect, useRef, useState } from "react";
import {
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import { menuState } from "../atoms/menuAtom";
import { useRecoilState } from "recoil";
import { modalState } from "../atoms/modalAtom";
import { logOut } from "../src/utils";
import { userState } from "../atoms/userAtom";
import { HomeIcon } from "@heroicons/react/solid";
import { useRouter } from "next/router";

const ShowMenu = () => {
  const [showMenu, setShowMenu] = useRecoilState(menuState);
  const [openModal, setOpenModal] = useRecoilState(modalState);
  const [user, setUser] = useRecoilState(userState);
  const Ref = useRef(null);
  const router = useRouter();

  useEffect(() => {
    const clickOutside = (event) => {
      if (showMenu && Ref.current && !Ref.current.contains(event.target)) {
        setShowMenu(!showMenu);
      }
    };

    document.addEventListener("click", clickOutside);
    return () => {
      document.removeEventListener("click", clickOutside);
    };
  }, [showMenu]);

  return (
    <div>
      {showMenu ? (
        <div
          ref={Ref}
          className={`absolute p-6 lg:hidden bg-white h-screen top-0 right-0 z-10 w-[10rem]
          }`}
        >
          <ul className="flex flex-col space-y-3 items-center">
            <HomeIcon
              onClick={() => router.push("/")}
              className="sideMenuBtn"
            />
            <div className="relative sideMenuBtn">
              <PaperAirplaneIcon className="sideMenuBtn rotate-45" />
              <div
                className="absolute -top-2 -right-2 text-xs w-5 h-5
            bg-red-500 rounded-full flex items-center justify-center text-white"
              >
                3
              </div>
            </div>
            <PlusCircleIcon
              onClick={() => setOpenModal(true)}
              className="sideMenuBtn"
            />
            <UserGroupIcon className="sideMenuBtn" />
            <HeartIcon className="sideMenuBtn" />
            <LogoutIcon
              className="sideMenuBtn"
              onClick={() => logOut(user, setUser)}
            />
          </ul>
        </div>
      ) : null}
    </div>
  );
};

export default ShowMenu;
