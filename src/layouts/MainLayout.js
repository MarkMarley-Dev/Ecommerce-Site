import Header from "../components/Header";
import Footer from "../components/Footer/Footer";

const MainLayout = (props) => {
  return (
    <div>
      <Header {...props} />
      <div className="main">{props.children}</div>
      <Footer />
    </div>
  );
};
export default MainLayout;