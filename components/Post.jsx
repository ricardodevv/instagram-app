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
import Moment from "react-moment";
import { useEffect, useState } from "react";
import { db } from "../firebase";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import currentUserState from "../atoms/currentUserState";

const Post = ({ id, username, img, description }) => {
  const user = useRecoilValue(userState);
  const [comment, setComment] = useState("");
  const [comments, setComments] = useState([]);
  const [likes, setLikes] = useState([]);
  const [hasLiked, setHasLiked] = useState([]);
  const currentUser = useRecoilValue(currentUserState);

  useEffect(() => {
    onSnapshot(
      query(
        collection(db, "posts", id, "comments"),
        orderBy("timestamp", "desc")
      ),
      (snapshot) => setComments(snapshot.docs)
    );
  }, [db]);

  console.log(currentUser);

  // useEffect(() => {
  //   onSnapshot(
  //     query(collection(db, "posts", id, "likes", user.id)),
  //     (snapshot) => setLikes(snapshot.docs)
  //   );
  // }, [db, id]);

  // useEffect(() => {
  //   setHasLiked(
  //     likes.findIndex(like => like.id === id)
  //   )
  // })

  console.log(user);

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

  const likePost = async () => {
    await addDoc(collection(db, "posts", id, "likes"), {
      username: username,
    });
  };

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
          <HeartIcon className="btn" onClick={() => likePost} />
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

      {comments.map((comment) => (
        <div key={comment.id}>
          <div className="flex ml-8 space-x-3">
            <img
              src={
                comment.data().profileImg
                  ? comment.data().profileImg
                  : "profileEmpty.png"
              }
              alt="profile picture"
              className="w-5 h-5 rounded-full"
            />
            <div className="group flex w-full justify-between">
              <div className="flex items-center">
                <h4 className="font-medium">{comment.data().username}</h4>
                <p className="ml-2">{comment.data().comment}</p>
                <HeartIcon
                  className="hidden group-hover:inline-flex w-4 h-4 ml-5 cursor-pointer"
                  onClick={() => likeComment(comment.data().username)}
                />
              </div>
              <Moment fromNow className="mr-5 text-xs text-gray-600">
                {comment.data().timestamp.toDate()}
              </Moment>
            </div>
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
