import "./default.scss";
import Header from "./components/Header";
import Homepage from "./pages/Homepage";

function App() {
  return (
    <div className="app">
      <Header />
      <div className="main">
        <Homepage />
      </div>
    </div>
  );
}

export default App;
