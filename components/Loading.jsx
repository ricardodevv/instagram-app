import Image from "next/image";
import { useRecoilState } from "recoil";
import loadingState from "../atoms/loadingAtom";

const Loading = () => {
  const [loading, setLoading] = useRecoilState(loadingState);

  if (loading) {
    return (
      <div className="fixed flex h-screen w-screen">
        <div className="relative w-14 h-14 m-auto">
          <Image src="/IgLoading.png" layout="fill" objectFit="contain" />
        </div>
      </div>
    );
  }

  return null;
};

export default Loading;
