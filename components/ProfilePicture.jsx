import { useRecoilValue } from "recoil";
import { userState } from "../atoms/userAtom";

const ProfilePicture = () => {
  const user = useRecoilValue(userState);

  return (
    <div>
      <img
        src={user.profilePic ? user.profilePic : "profileEmpty.png"}
        alt="profile picture"
      />
    </div>
  );
};

export default ProfilePicture;
