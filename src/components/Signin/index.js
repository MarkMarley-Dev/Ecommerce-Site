import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { Link, withRouter } from "react-router-dom";
import {
  signInUser,
  signInWithGoogle,
  resetAllAuthForms,
} from "../../redux/user.actions";

import FormInput from "../form/FormInput/Input";
import Button from "../form/Button";
import AuthWrapper from "../AuthWrapper";

const mapState = ({ user }) => ({ signInSuccess: user.signInSuccess });

const SignIn = (props) => {
  const { signInSuccess } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  useEffect(() => {
    if (signInSuccess) {
      reset();
      dispatch(resetAllAuthForms);
      props.history.push("/");
    }
  }, [signInSuccess]);

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signInUser({ email, password }));
  };

  const handleGoogleSignIn = () => {
    dispatch(signInWithGoogle());
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

export default withRouter(SignIn);
