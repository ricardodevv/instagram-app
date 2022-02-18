import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import postsState from "../atoms/postsAtom";
import { db } from "../firebase";
import Post from "./Post";

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const q = query(collection(db, "posts"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      setPosts(querySnapshot.docs);
    });
    return unsub;
  }, [db]);

  console.log(posts);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.data().id}
          id={post.data().id}
          username={post.data().username}
          img={post.data().image}
          description={post.data().description}
        />
      ))}
    </div>
  );
};

export default Posts;
