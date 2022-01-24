import "./default.scss";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { checkUserSession } from "./redux/User/user.actions";
import { Route, Switch, Redirect } from "react-router-dom";
import Admin from "./pages/Admin";

// components

import AdminToolbar from "./components/EmailPassword/AdminToolbar";

//hoc
import WithAuth from "./hoc/withAuth";
import WithAdminAuth from "./hoc/withAdminAuth";

// Pages
import Homepage from "./pages/Homepage";
import Registration from "./pages/Registration";
import Login from "./pages/Login";
import Recovery from "./pages/Recovery";
import Dashboard from "./pages/Dashboard";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import DashBoardLayout from "./layouts/DashboardLayout";
import MainLayout from "./layouts/MainLayout";
import HomepageLayout from "./layouts/HomepageLayout";

const App = (props) => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, []);

  return (
    <div className="app">
      <AdminToolbar />
      <Switch>
        <Route
          exact
          path="/"
          render={() => (
            <HomepageLayout>
              <Homepage />
            </HomepageLayout>
          )}
        />
        <Route
          exact
          path="/registration"
          render={() => (
            <MainLayout>
              <Registration />
            </MainLayout>
          )}
        />
        <Route
          exact
          path="/login"
          render={() => (
            <MainLayout>
              <Login />
            </MainLayout>
          )}
        />
        <Route
          path="/recovery"
          render={() => (
            <MainLayout>
              <Recovery />
            </MainLayout>
          )}
        />
        <Route
          path="/dashboard"
          render={() => (
            <WithAuth>
              <MainLayout>
                <Dashboard />
              </MainLayout>
            </WithAuth>
          )}
        />
        <Route
          path="/admin"
          render={() => (
            <WithAdminAuth>
              <MainLayout>
                <Admin />
              </MainLayout>
            </WithAdminAuth>
          )}
        />
      </Switch>
    </div>
  );
};

export default App;
