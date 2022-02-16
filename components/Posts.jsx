import { useRecoilValue } from "recoil";
import postsState from "../atoms/postsAtom";
import Post from "./Post";

const Posts = () => {
  const posts = useRecoilValue(postsState);

  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          img={post.image}
          description={post.description}
        />
      ))}
    </div>
  );
};

export default Posts;
