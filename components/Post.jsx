import {
  ChatIcon,
  DotsHorizontalIcon,
  PaperAirplaneIcon,
  HeartIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";

const Post = ({ id, username, userImg, img, caption }) => {
  return (
    <div className="bg-white my-7 border rounded-sm">
      {/* // * Header */}

      <div className="flex items-center p-3">
        <img
          className="rounded-full h-12 w-12 object-contain
      border p-1 mr-3 cursor-pointer"
          src={userImg}
          alt="user image"
        />
        <p className="flex-1 font-bold text-gray-800">{username}</p>
        <DotsHorizontalIcon className="h-5 cursor-pointer" />
      </div>

      {/* // * img */}
      <img className="object-cover w-full" src={img} alt="" />

      {/* // * Buttons */}
      <div className="flex justify-between px-4 pt-4">
        <div className="flex space-x-4">
          <HeartIcon className="btn" />
          <ChatIcon className="btn" />
          <PaperAirplaneIcon className="relative btn rotate-[63deg] -top-[3.5px] scale-[0.9]" />
        </div>

        <BookmarkIcon className="btn" />
      </div>

      {/* // * caption */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1 text-gray-800">{username}</span>
        {caption}
      </p>

      {/* // * comments */}

      {/* // * input box */}
      <form className="flex items-center p-4" action="">
        <EmojiHappyIcon className="h-6 cursor-pointer" />
        <input
          type="text"
          placeholder="Add a commet..."
          className="border-none flex-1 focus:ring-0 outline-none"
        />
        <button className="font-semibold text-blue-400">Post</button>
      </form>
    </div>
  );
};

export default Post;
