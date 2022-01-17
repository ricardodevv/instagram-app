import Image from "next/image";
import { SearchIcon, HomeIcon, MenuIcon } from "@heroicons/react/solid";
import {
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/outline";
import { useSession, signIn } from "next-auth/react";
import { useEffect, useRef, useState } from "react";

const Header = () => {
  const [showPopper, setShowPopper] = useState(false);
  const { data: session } = useSession();
  const popperRef = useRef(null);

  useEffect(() => {
    const clickOutside = (event) => {
      console.log(event.target);
      if (
        showPopper &&
        popperRef.current &&
        !popperRef.current.contains(event.target)
      ) {
        setShowPopper(!showPopper);
      }
    };

    document.addEventListener("mousedown", clickOutside);
    return () => {
      document.removeEventListener("mousedown", clickOutside);
    };
  }, [showPopper]);

  return (
    <div className="shadow-sm border-b bg-white sticky top-0 z-50">
      {/* // *Logo  */}
      <div className="flex justify-between max-w-6xl mx-5 xl:mx-auto">
        <div className="relative hidden lg:inline-grid w-24">
          <Image
            src={"https://links.papareact.com/ocw"}
            layout="fill"
            objectFit="contain"
          />
        </div>

        <div className="relative lg:hidden w-10 flex-shrink-0 cursor-pointer">
          <Image
            src={"https://links.papareact.com/jjm"}
            layout="fill"
            objectFit="contain"
          />
        </div>

        {/* // * Search bar  */}
        <div className="relative mt-1 p-3 rounded-md">
          <div className="absolute inset-y-0 pl-3 flex items-center pointer-events-none">
            <SearchIcon className="h-5 w-5 text-gray-500" />
          </div>
          <input
            className="bg-gray-50 block w-full pl-10 sm:text-sm transition delay-100 border-gray-300 focus:ring-black focus:border-black rounded-md"
            type="text"
            placeholder="Search"
          />
        </div>

        {/* // * Nav section */}
        <div className="flex items-center justify-end space-x-4">
          <HomeIcon className="navBtn" />
          <MenuIcon className="h-6 md:hidden cursor-pointer" />

          {session ? (
            <>
              <div className="relative navBtn">
                <PaperAirplaneIcon className="navBtn rotate-45" />
                <div
                  className="absolute -top-2 -right-2 text-xs w-5 h-5
            bg-red-500 rounded-full flex items-center justify-center text-white"
                >
                  3
                </div>
              </div>
              <PlusCircleIcon className="navBtn" />
              <UserGroupIcon className="navBtn" />
              <HeartIcon className="navBtn" />

              <div>
                <img
                  src={session?.user?.image}
                  alt="profile-pic"
                  className="h-6 rounded-full cursor-pointer"
                  ref={popperRef}
                  onClick={() => setShowPopper(!showPopper)}
                />
                {showPopper ? (
                  <div className="absolute bg-slate-500 p-3">Popper</div>
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
