import "./styles.scss";
import Button from "../form/Button";
import { signInWithGoogle } from "../../firebase/utils";

const SignIn = (props) => {
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <div className="signin">
      <div className="wrap">
        <h2>Login</h2>
        <div className="formWrap">
          <form onSubmit={handleSubmit}>
            <div className="socialSignin">
              <div className="row">
                <Button onClick={signInWithGoogle}> Sign in with google</Button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
