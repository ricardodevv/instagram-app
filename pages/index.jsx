import Head from "next/head";
import Header from "../components/Header";
import Feed from "../components/Feed";
import Modal from "../components/Modal";
import CheckIsLogged from "../components/CheckIsLogged";
import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { useEffect } from "react";
import { useRouter } from "next/router";
import loadingState from "../atoms/loadingAtom";

const Home = () => {
  const [user, setUser] = useRecoilState(userState);
  const [loading, setLoading] = useRecoilState(loadingState);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  return (
    <CheckIsLogged pageTitle="Home">
      <div>
        {user ? (
          <div className="bg-gray-50 h-screen">
            {/* {user.length > 0 ? ( */}
            <div>
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
            {/* ) : null} */}
          </div>
        ) : null}
      </div>
    </CheckIsLogged>
  );
};

export default Home;
