import { collection, onSnapshot, query } from "firebase/firestore";
import { useEffect, useState } from "react";
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

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.data().id}
          id={post.id}
          username={post.data().username}
          img={post.data().image}
          description={post.data().description}
          comments={post.data().comments}
        />
      ))}
    </div>
  );
};

export default Posts;
