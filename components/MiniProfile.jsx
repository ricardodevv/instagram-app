import { useRecoilState } from "recoil";
import { userState } from "../atoms/userAtom";
import { useAuth } from "../src/utils";

const MiniProfile = () => {
  const [user, setUser] = useRecoilState(userState);
  const auth = useAuth();

  return (
    <div
      className="flex items-center justify-between
    mt-14 ml-10"
    >
      <img
        className="w-14 h-14 rounded-full border"
        src="https://cutewallpaper.org/22/anime-profile-picture-wallpapers/3005126266.jpg"
        alt="profile picture"
      />

      <div className="flex-1 mx-4">
        <h2 className="text-sm font-bold text-gray-700 ">{user.name}</h2>
        <h3 className="text-xs text-gray-400">Welcome to Instagram</h3>
      </div>

      <button
        className="text-blue-400 text-xs font-semibold ml-4"
        onClick={() => auth.signout()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
