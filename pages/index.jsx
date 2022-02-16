import Feed from "../components/Feed";
import Layout from "../components/Layout";
import CheckIsLogged from "../components/CheckIsLogged";
import { useRecoilState, useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { collection, doc, onSnapshot, query } from "firebase/firestore";
import { db } from "../firebase";
import { useEffect, useState } from "react";
import postsState from "../atoms/postsAtom";

const Home = () => {
  const user = useRecoilValue(userState);
  const [posts, setPosts] = useRecoilState(postsState);
  const [a, b] = useState([]);
  useEffect(() => {
    const arr = [];
    const q = query(collection(db, "posts"));
    const unsub = onSnapshot(q, (querySnapshot) => {
      querySnapshot.forEach((doc) =>
        setPosts((posts) => [...posts, doc.data()])
      );
    });
    return unsub;
  }, [db]);

  console.log(posts);

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

// export const getServerSideProps = async (context) => {

//   return { props: { posts } };
// };

export default Home;
