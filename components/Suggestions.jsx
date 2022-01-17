import suggestions from "../src/suggestions";

const Suggestions = () => {
  return (
    <div className="mt-5 ml-10">
      <div className="flex justify-between text-sm mb-5">
        <h3 className="text-sm font-bold text-gray-400">Suggestions for you</h3>
        <button className="text-gray-600 font-semibold">See All</button>
      </div>
      {suggestions.slice(5).map((suggestion) => (
        <div
          key={suggestion.id}
          className="flex items-center justify-between mt-3"
        >
          <img
            className="w-10 h-10 rounded-full border p-[2px] cursor-pointer"
            src={suggestion.img}
            alt="profile suggestion image"
          />

          <div className="flex-1 ml-4">
            <h2 className="font-semibold text-sm text-gray-700 cursor-pointer">
              {suggestion.username}
            </h2>
            <h3 className="text-xs text-gray-400">
              You have a friend in common
            </h3>
          </div>

          <button className="text-blue-400 text-xs font-semibold">
            Follow
          </button>
        </div>
      ))}
    </div>
  );
};

export default Suggestions;
