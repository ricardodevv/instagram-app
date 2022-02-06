import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useRecoilValue } from "recoil";
import loadingState from "../atoms/loadingAtom";
import { userState } from "../atoms/userAtom";
import Header from "../components/Header";

const Layout = ({ children, pageTitle }) => {
  const user = useRecoilValue(userState);
  const loading = useRecoilValue(loadingState);
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user]);

  return (
    <div className="bg-[#fafafa]">
      <Head>
        <title>{pageTitle}</title>
      </Head>
      {user && <Header />}
      {children}
    </div>
  );
};

export default Layout;
