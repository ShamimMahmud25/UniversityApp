import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Create from "./pages/Create";
import { createTheme, ThemeProvider } from "@material-ui/core";
import { purple } from "@material-ui/core/colors";
// import {Login} from "./modules/Login/Login";
import {LoginNew} from "./modules/Login/LoginNew"
 import {Signup} from "./modules/SignUp/Signup"
import Forgetpassword from "./components/Forgetpassword";
import {SignupNew} from "./modules/SignUp/SignupNew";
import { NewRegistration } from "./modules/Registration/NewRegistration";
import  {Emailverification} from "./modules/Verification/Emailverification"
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
              <SignupNew/>
            </Route>
            <Route exact path="/signup">
              <SignupNew/>
            </Route>
            <Route exact path="/register">
              <NewRegistration/>
            </Route>
            <Route exact path="/login">
              <LoginNew/>
            </Route>
            <Route exact path="/forget-password">
              <Forgetpassword/>
            </Route>
            <Route exact path="/verify/email">
              <Emailverification/>
            </Route>
            <Route exact path="/home">
              <Home/>
            </Route>
            <Route exact path="/create">
              <Create />
            </Route>
             <Route path="/new">
              <Signup/>
            </Route>
            <Route path="/test">
              <Test/>
            </Route>
            
          </Switch>
      </Router>
    </ThemeProvider>
    </Provider>
  );
}

export default App;
