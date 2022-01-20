import { useState, useEffect } from "react";
import { withRouter } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import "./styles.scss";
import { resetPassword, resetAllAuthForms } from "../../redux/user.actions";
import AuthWrapper from "../AuthWrapper";
import FormInput from "../form/FormInput/Input";
import Button from "../form/Button";

const mapState = ({ user }) => ({
  resetPasswordSucess: user.resetPasswordSucess,
  resetPasswordError: user.resetPasswordError,
});

const EmailPassword = (props) => {
  const { resetPasswordSucess, resetPasswordError } = useSelector(mapState);
  const dispatch = useDispatch();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState([]);

  useEffect(() => {
    if (resetPasswordSucess) {
      dispatch(resetAllAuthForms);
      props.history.push("/login");
    }
  }, [resetPasswordSucess]);

  useEffect(() => {
    if (Array.isArray(resetPasswordError) && resetPasswordError.length > 0) {
      setErrors(resetPasswordError);
    }
  }, [resetPasswordError]);

  useEffect(() => {}, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(resetPassword({ email }));
  };

  const configAuthWrapper = {
    headline: "Email Password",
  };
  return (
    <AuthWrapper {...configAuthWrapper}>
      <div className="formWrap">
        {errors.length > 0 && (
          <ul>
            {errors.map((e, index) => {
              return <li key={index}>{e}</li>;
            })}
          </ul>
        )}
        <form onSubmit={handleSubmit}>
          <FormInput
            type="email"
            name="email"
            value={email}
            placeholder="Email"
            handleChange={(e) => setEmail(e.target.value)}
          />
          <Button type="submit">Email Password </Button>
        </form>
      </div>
    </AuthWrapper>
  );
};

export default withRouter(EmailPassword);
