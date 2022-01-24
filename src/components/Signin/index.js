import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { Link, useHistory } from "react-router-dom";
import {
  emailSignInStart,
  googleSignInStart,
} from "../../redux/User/user.actions";

import FormInput from "../forms/FormInput/Input";
import Button from "../forms/Button";
import AuthWrapper from "../AuthWrapper";

const mapState = ({ user }) => ({ currentUser: user.currentUser });

const SignIn = (props) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const { currentUser } = useSelector(mapState);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (currentUser) {
      reset();

      history.push("/");
    }
  }, [currentUser]);

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(emailSignInStart({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(googleSignInStart());
  };

  const configAuthWrapper = {
    headline: "LogIn",
  };

  return (
    <AuthWrapper {...configAuthWrapper}>
      <form onSubmit={handleSubmit}>
        <FormInput
          type="email"
          name="email"
          value={email}
          placeholder="Email"
          handleChange={(e) => setEmail(e.target.value)}
        />
        <FormInput
          type="password"
          name="password"
          value={password}
          placeholder="Password"
          handleChange={(e) => setPassword(e.target.value)}
        />
        <Button type="submit">Login</Button>
        <div className="socialSignin">
          <div className="row">
            <Button onClick={handleGoogleSignIn}>Sign in with google</Button>
          </div>
        </div>
        <div className="links">
          <Link to="/recovery">Reset Password</Link>
        </div>
      </form>
    </AuthWrapper>
  );
};

export default SignIn;
