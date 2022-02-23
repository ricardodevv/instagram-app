import {
  ChatIcon,
  DotsHorizontalIcon,
  PaperAirplaneIcon,
  HeartIcon,
  BookmarkIcon,
  EmojiHappyIcon,
} from "@heroicons/react/outline";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  serverTimestamp,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { db } from "../firebase";

const Post = ({ id, username, img, description }) => {
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

  const sendComment = async (e) => {
    e.preventDefault();

    const commentToSend = comment;
    setComment("");

    await addDoc(collection(db, "posts", id, "comments"), {
      comment: commentToSend,
      username: username,
      timestamp: serverTimestamp(),
    });
  };
  console.log(id);
  console.log(comments);

  return (
    <div key={id} className="bg-white my-7 border rounded-sm">
      <div className="flex items-center p-3">
        <img
          className="rounded-full h-9 w-9 object-contain
      border mr-3 cursor-pointer"
          src="duck.jpg"
          alt="user image"
        />
        <p className="flex-1 font-bold text-sm text-gray-700">{username}</p>
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

      {/* // * description */}
      <p className="p-5 truncate">
        <span className="font-bold mr-1 text-gray-800">{username}</span>
        {description}
      </p>

      {/* // * comments */}

      {comments.map((el) => (
        <div key={el.id}>
          <div className="flex ml-4 space-x-2">
            <img
              src={
                el.data().profileImg ? el.data().profileImg : "profileEmpty.png"
              }
              alt="profile picture"
              className="w-5 h-5 rounded-full"
            />
            <h4 className="font-medium text-sm">{el.data().username}</h4>
            <p className="text-sm">{el.data().comment}</p>
          </div>
        </div>
      ))}

      {/* // * input box */}
      <form className="flex items-center p-4">
        <EmojiHappyIcon className="h-6 cursor-pointer" />
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Add a commet..."
          className="border-none flex-1 focus:ring-0 outline-none"
        />
        <button
          type="submit"
          disabled={!comment.trim()}
          onClick={sendComment}
          className="font-semibold text-blue-500"
        >
          Post
        </button>
      </form>
    </div>
  );
};

export default Post;
