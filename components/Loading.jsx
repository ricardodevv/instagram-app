import Image from "next/image";
import { useRecoilState } from "recoil";
import emailState from "../atoms/emailAtom";
import loadingState from "../atoms/loadingAtom";

const Loading = () => {
  const [loading, setLoading] = useRecoilState(loadingState);

  if (loading) {
    return <div className="fixed flex h-screen w-screen bg-white"></div>;
  }

  return null;
};

export default Loading;
