import { useIfLogged } from "../src/utils";
import Loading from "./Loading";

const CheckIsLogged = ({ children, pageTitle }) => {
  const checkIfCurrentUser = useIfLogged();

  // const autho = useAuth();

  // useEffect(() => {
  //   onAuthStateChanged(auth, (currrentUser) => {
  //     if (currrentUser) {
  //       autho.userToFind(currrentUser.email);
  //       setRegisterEmail(currrentUser.email);
  //     }
  //     if (user) {
  //       if (loading) {
  //         setLoading(!loading);
  //       }
  //     }
  //   });
  // }, [user]);

  return (
    <div>
      <Loading />
      {children}
    </div>
  );
};

export default CheckIsLogged;
