import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import ProfilePicture from "../components/ProfilePicture";
import CheckIsLogged from "../components/CheckIsLogged";
import Layout from "../components/Layout";

const profile = () => {
  const user = useRecoilValue(userState);

  return (
    <CheckIsLogged>
      <Layout>
        {user ? (
          <div>
            <div className="">
              <ProfilePicture />
            </div>
            <div></div>
            <div></div>
          </div>
        ) : null}
      </Layout>
    </CheckIsLogged>
  );
};

export default profile;
