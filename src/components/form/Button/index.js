import "./styles.scss";

const Button = ({ children, ...otherprops }) => {
  return (
    <button {...otherprops} className="btn">
      {children}
    </button>
  );
};

export default Button;
