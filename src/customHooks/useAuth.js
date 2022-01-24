import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useHistory } from "react-router-dom/cjs/react-router-dom.min";

const mapState = ({ user }) => ({
  currentUser: user.currentUser,
});

const useAuth = (props) => {
  const { currentUser } = useSelector(mapState);
  const history = useHistory();

  useEffect(() => {
    if (!currentUser) history.push("/login");
    return () => {};
  }, [currentUser]);

  return currentUser;
};

export default useAuth;
