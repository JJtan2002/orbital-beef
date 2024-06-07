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
import { useState, useEffect } from "react";

const App = () => {
  /*const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
*/
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") || false);
  const [name, setName] = useState(localStorage.getItem("name") || "");
  const [email, setEmail] = useState(localStorage.getItem("email") || "");

  useEffect(() => {
    if (localStorage.getItem("isLoggedIn") === "true") {
      setIsLoggedIn(true);
      setName(localStorage.getItem("name"));
      setEmail(localStorage.getItem("email"));
    }
  }, []);

  return (
    <div className="md:h-screen #d1fae5">
      <BrowserRouter>
        <ToastContainer />
        <AppNavBar
          isLoggedIn={isLoggedIn}
          setIsLoggedIn={setIsLoggedIn}
          name={name}
          setName={setName}
          email={email}
          setEmail={setEmail}
        />
        <div>
          <Routes>
            <Route path="/" exact
              element={
                <Home isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn} />
              }
            />
            <Route path="register" exact
              element={
                <Register
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setName={setName}
                  setEmail={setEmail}
                />
              }
            />
            <Route path="login" exact
              element={
                <Login
                  isLoggedIn={isLoggedIn}
                  setIsLoggedIn={setIsLoggedIn}
                  setName={setName}
                  setEmail={setEmail}
                />
              }
            />
            <Route path="forgotPassword" exact
              element={<ForgotPassword isLoggedIn={isLoggedIn} />}
            />
            <Route path="resetPassword"
              element={<ResetPassword isLoggedIn={isLoggedIn} />}
            />
            <Route path="profile" exact
              element={
                <Profile isLoggedIn={isLoggedIn} name={name} email={email} />
              }
            />
          </Routes>
        </div>
      </BrowserRouter>
    </div>
  );
};

export default App;