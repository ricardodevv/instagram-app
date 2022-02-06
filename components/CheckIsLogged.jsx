import { useIfLogged } from "../src/utils";
import Loading from "./Loading";

const CheckIsLogged = ({ children }) => {
  const checkIfCurrentUser = useIfLogged();

  return (
    <div>
      <Loading />
      {children}
    </div>
  );
};

export default CheckIsLogged;
