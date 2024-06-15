import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import AppNavBar from "./components/AppNavBar";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import ForgotPassword from "./pages/ForgotPassword";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ResetPassword from "./pages/ResetPassword";
import Profile from "./pages/Profile";
import Protected from "./pages/Protected";

const App = () => {

  return (
    <div className="md:h-screen #d1fae5">
      <BrowserRouter>
        <ToastContainer />
        <AppNavBar
        />
        <div>
          <Routes>
            <Route path="/" exact
              element={
                <Home 
                />
              }
            />
            <Route path="register" exact
              element={
                <Register
                />
              }
            />
            <Route path="login" exact
              element={
                <Login
                />
              }
            />
            <Route path="forgotPassword" exact
              element={<ForgotPassword 
              />}
            />
            <Route path="resetPassword"
              element={<ResetPassword 
              />}
            />
            <Route path="profile" exact
              element={
                <Profile 
                />
              }
            />
            <Route path="protected" exact
              element={
                <Protected
                />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;