import { Switch, Route } from "react-router-dom";
import Create from "./pages/Create";
import { LoginNew } from "./modules/Login/LoginNew";
import { Signup } from "./modules/SignUp/Signup";
import Forgetpassword from "./components/Forgetpassword";
import { SignupNew } from "./modules/SignUp/SignupNew";
import { NewRegistration } from "./modules/Registration/NewRegistration";
import { Emailverification } from "./modules/Verification/Emailverification";
import { ResetPassword } from "./modules/ResetPassword/ResetPassword";
import { Test } from "./modules/Registration/TestComponent";
import HomeNew from "./modules/Home/HomeNew";
import SendMail from "./modules/SendMail/SendMail";
import UserProfile from "./modules/UserProfile/UserProfile";
import { JobProfile } from "./modules/JobProfile/JobProfile";
import JobProfiles from "./modules/JobProfiles/JobProfiles";
import TeachersProfile from "./modules/TeachersProfile/TeachersProfile";
import Files from "./modules/Files/Files";
import { ForgetPassword } from "./modules/ForgetPassword/ForgetPassword";

export default (
  <div>
    <Switch>
      <Route exact path="/">
        <SignupNew />
      </Route>
      <Route exact path="/signup">
        <SignupNew />
      </Route>
      <Route exact path="/register">
        <NewRegistration />
      </Route>
      <Route exact path="/login">
        <LoginNew />
      </Route>
      <Route exact path="/forget-password">
        <Forgetpassword />
      </Route>
      <Route exact path="/verify/email">
        <Emailverification />
      </Route>
      <Route exact path="/resetpassword">
        <ResetPassword />
      </Route>
      <Route exact path="/forgetpassword">
        <ForgetPassword />
      </Route>
      <Route exact path="/home">
        <HomeNew />
      </Route>
      <Route exact path="/sendmail">
        <SendMail />
      </Route>
      <Route exact path="/userProfile">
        <UserProfile />
      </Route>
      <Route exact path="/jobProfile">
        <JobProfile />
      </Route>
      <Route exact path="/jobProfiles">
        <JobProfiles />
      </Route>
      <Route exact path="/files">
        <Files />
      </Route>
      <Route exact path="/teachers">
        <TeachersProfile />
      </Route>
      <Route exact path="/create">
        <Create />
      </Route>
      <Route path="/new">
        <Signup />
      </Route>
      <Route path="/test">
        <Test />
      </Route>
    </Switch>
  </div>
);
