import Image from "next/image";
import { SearchIcon, HomeIcon, MenuIcon } from "@heroicons/react/solid";
import {
  PaperAirplaneIcon,
  PlusCircleIcon,
  UserGroupIcon,
  HeartIcon,
} from "@heroicons/react/outline";

const Header = () => {
  return (
    <div>
      {/* // *Logo  */}
      <div className="flex justify-between max-w-6xl mx-5 lg:mx-auto cursor-pointer">
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
          <PaperAirplaneIcon className="navBtn" />
          <PlusCircleIcon className="navBtn" />
          <UserGroupIcon className="navBtn" />
          <HeartIcon className="navBtn" />

          <img />
        </div>
      </div>
    </div>
  );
};

export default Header;
