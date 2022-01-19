import { Component } from "react/cjs/react.production.min";
import "./styles.scss";
import { Link } from "react-router-dom";
import { signInWithGoogle, auth } from "../../firebase/utils";

import FormInput from "../form/FormInput/Input";
import Button from "../form/Button";
import AuthWrapper from "../AuthWrapper";

const initialState = {
  email: "",
  password: "",
};

class SignIn extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...initialState,
    };
    this.handleChange = this.handleChange.bind(this);
  }
  handleSubmit = async (e) => {
    e.preventDefault();
    const { email, password } = this.state;

    try {
      await auth.signInWithEmailAndPassword(email, password);
      this.setState({
        ...initialState,
      });
    } catch (error) {}
  };

  handleChange(e) {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  }
  render() {
    const { email, password } = this.state;
    const configAuthWrapper = {
      headline: "Login",
    };
    return (
      <AuthWrapper {...configAuthWrapper}>
        <form onSubmit={this.handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={this.handleChange}
          />
          <FormInput
            type="password"
            name="password"
            value={password}
            placeholder="Password"
            handleChange={this.handleChange}
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
  }
}

export default SignIn;
