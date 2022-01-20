import { useState } from "react";
import "./styles.scss";
import { Link, withRouter } from "react-router-dom";
import { signInWithGoogle, auth } from "../../firebase/utils";

import FormInput from "../form/FormInput/Input";
import Button from "../form/Button";
import AuthWrapper from "../AuthWrapper";

const SignIn = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const reset = () => {
    setEmail("");
    setPassword("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await auth.signInWithEmailAndPassword(email, password);
      reset();
      props.history.push("/");
    } catch (err) {}
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
            <Button onClick={signInWithGoogle}>Sign in with google</Button>
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
