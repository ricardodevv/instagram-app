import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";

const Home = () => {
  return (
    <div className="">
      <Head>
        <title>Instagram</title>
      </Head>

      {/* // * Header */}
      <Header />

      {/* // * Feet  */}
      <Feed />

      {/* // * Model */}
    </div>
  );
};

export default Home;