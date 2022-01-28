import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Create from "./pages/Create";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
import {Login} from "./modules/Login/Login"
import {Signup} from "./modules/SignUp/Signup"
import Forgetpassword from "./components/Forgetpassword";
import {Registration} from "./modules/Registration/Registration"
import { Test } from "./modules/Registration/TestComponent";
//import WithLayout from "./components/WithLayout";
import { Provider } from "react-redux";
import { store } from "./store";
import Home from "./modules/Home/Home";

const theme = createTheme({
  palette: {
    primary: {
      main: "#b0c0d0",
    },
    secondary: purple,
  },
  typography: {
    frontFamily: "Quicksand",
    frontWeightLight: 400,
    frontWeightRegular: 500,
    frontWeightMedium: 600,
    frontWeightBold: 700,
  },
});

function App() {
  return (
    <Provider store={store}>
    <ThemeProvider theme={theme}>
      <Router>
          <Switch>
            <Route exact path="/">
              <Signup/>
            </Route>
            <Route exact path="/home">
              <Home/>
            </Route>
            <Route path="/create">
              <Create />
            </Route>
            <Route path="/signup">
              <Signup/>
            </Route>
            <Route path="/login">
              <Login/>
            </Route>
            <Route path="/forget-password">
              <Forgetpassword/>
            </Route>
            <Route path="/register">
              <Registration/>
            </Route>
            <Route path="/test">
              <Test/>
            </Route>
            <Route path="/home">
              <Home/>
            </Route>
          </Switch>
      </Router>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
