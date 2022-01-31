import { PlusCircleIcon } from "@heroicons/react/outline";
import people from "../src/people";

const Stories = () => {
  return (
    <div
      className="flex space-x-3 p-6 bg-white mt-8 
    border-gray-200 border rounded-sm overflow-x-scroll
    scrollbar-thin scrollbar-thumb-black"
    >
      <div>
        <div
          className="relative hover:scale-110 transition-all transform
        duration-200 ease-out active:scale-95 cursor-pointer"
        >
          <img src="duck.jpg" className="bg-white rounded-full" />
          <PlusCircleIcon className="absolute w-6 top-8 left-8 stroke-white fill-blue-600" />
        </div>
        <p className="text-xs w-14 truncate text-center">Your stories</p>
      </div>

      {people.map((el) => {
        return (
          <div key={el.id}>
            <img
              className="h-14 w-14 rounded-full p-[2px] object-contain  
              cursor-pointer hover:scale-110 transition transform
              duration-200 ease-out active:scale-95 
              bg-white border-[2px] border-red-500"
              src={el.picture}
              alt="profile pic"
            />
            <p className="text-xs w-14 truncate text-center">{el.username}</p>
          </div>
        );
      })}
    </div>
  );
};

export default Stories;
