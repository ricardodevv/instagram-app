import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Modal from "../components/Modal";

const Home = () => {
  return (
    <div className="bg-gray-50 h-screen overflow-y-scroll">
      <Head>
        <title>Instagram</title>
      </Head>

      {/* // * Header */}
      <Header />

      {/* // * Feed  */}
      <Feed />

      {/* // * Modal */}
      <Modal />
    </div>
  );
};

export default Home;
