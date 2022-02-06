import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";
import { useAuth } from "../src/utils";

const MiniProfile = () => {
  const user = useRecoilValue(userState);
  const auth = useAuth();

  return (
    <div
      className="flex items-center justify-between
    mt-14 ml-6"
    >
      <img
        className="w-14 h-14 rounded-full border cursor-pointer"
        src={user.profilePic ? user.profilePic : "profileEmpty.png"}
        alt="profile picture"
      />

      <div className="flex-1 ml-4">
        <h2 className="text-sm font-bold text-black cursor-pointer">
          {user.username}
        </h2>
        <h3 className="text-sm text-gray-500">{user.name}</h3>
      </div>

      <button
        className="text-blue-400 text-xs font-semibold ml-16"
        onClick={() => auth.signout()}
      >
        Sign Out
      </button>
    </div>
  );
};

export default MiniProfile;
