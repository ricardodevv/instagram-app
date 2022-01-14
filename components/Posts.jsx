import Post from "./Post";

const posts = [
  {
    id: 1,
    username: "logan",
    userImg: "/duck.jpg",
    img: "https://cdn.pocket-lint.com/r/s/1200x630/assets/images/152432-games-feature-what-is-valorant-a-guide-to-the-free-to-play-fps-with-tips-on-how-to-win-image3-muha6tfgev.jpg",
    caption: "jett is awesome",
  },
  {
    id: 2,
    username: "lucius",
    userImg: "/kirby.jpg",
    img: "https://xboxplay.games/imagenes/redimensionar2.php?imagen=https://xboxplay.games/uploadStream/19947.jpg&an=722&al=400",
    caption: "finally a good game",
  },
];

const Posts = () => {
  return (
    <div>
      {posts.map((post) => (
        <Post
          key={post.id}
          id={post.id}
          username={post.username}
          userImg={post.userImg}
          img={post.img}
          caption={post.caption}
        />
      ))}
    </div>
  );
};

export default Posts;
