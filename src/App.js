import "./default.scss";
import { Component } from "react";
// import { useState } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { auth, handleUserProfile } from "./firebase/utils";

// Pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";

// Layouts
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

const initialState = {
  currentUser: null,
};

class App extends Component {
  constructor(props) {
    super(props);

    this.state = {
      ...initialState,
    };
  }
  authListener = null;

  componentDidMount() {
    this.authListener = auth.onAuthStateChanged(async (userAuth) => {
      if (!userAuth) {
        const userRef = await handleUserProfile(userAuth);
        userRef.onSnapshot((snapshot) => {
          this.setState({
            currentUser: {
              id: snapshot.id,
              ...snapshot.data(),
            },
          });
        });
      }
      this.setState({
        ...initialState,
      });
    });
  }

  componentDidUpdate() {
    this.authListener();
  }

  render() {
    const { currentUser } = this.state;
    return (
      <div className="app">
        <Switch>
          <Route
            exact
            path="/"
            render={() => (
              <HomepageLayout currentUser={currentUser}>
                <Homepage />
              </HomepageLayout>
            )}
          />
          <Route
            exact
            path="/registration"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Registration />
                </MainLayout>
              )
            }
          />
          <Route
            exact
            path="/login"
            render={() =>
              currentUser ? (
                <Redirect to="/" />
              ) : (
                <MainLayout currentUser={currentUser}>
                  <Login />
                </MainLayout>
              )
            }
          />
          <Route
            path="/recovery"
            render={() => (
              <MainLayout>
                <Recovery />
              </MainLayout>
            )}
          />
        </Switch>
      </div>
    );
  }
}

export default App;
