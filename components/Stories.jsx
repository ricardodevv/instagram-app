import people from "../src/people";

const Stories = () => {
  console.log(people.map((el) => el));
  return (
    <div
      className="flex space-x-3 p-6 bg-white mt-8 
    border-gray-200 border rounded-sm overflow-x-scroll
    scrollbar-thin scrollbar-thumb-black"
    >
      {people.map((el) => {
        return (
          <div key={el.id}>
            <img
              className="h-14 w-14 rounded-full p-[2px] 
              bg-white border-[2px] border-red-500 object-contain 
              cursor-pointer hover:scale-110 transition transform
              duration-200 ease-out active:scale-95"
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
