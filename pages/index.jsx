import Feed from "../components/Feed";
import Modal from "../components/Modal";
import Layout from "../components/Layout";
import CheckIsLogged from "../components/CheckIsLogged";
import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";

const Home = () => {
  const user = useRecoilValue(userState);

  return (
    <CheckIsLogged>
      <Layout pageTitle="Home - Instagram">
        <div>
          {user ? (
            <div className="bg-gray-50">
              <div>
                {/* // * Feed  */}
                <Feed />
              </div>
            </div>
          ) : null}
        </div>
      </Layout>
    </CheckIsLogged>
  );
};

export default Home;
