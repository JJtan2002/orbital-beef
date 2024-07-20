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
import Dashboard from "./pages/Dashboard";
import Protected from "./pages/Protected";
import TransactionsList from "./pages/TransactionsList";
import Wallet from "./pages/Wallet";
import { useEffect } from "react";
import useAxiosPrivate from "./hooks/useAxiosPrivate";
import { useAuth } from "./contexts/AuthContext";
import { DashboardContextProvider } from "./contexts/DashBoardContext";
import { ProfileContextProvider } from "./contexts/ProfileContext";
import About from "./pages/About";
import Setting from "./pages/Setting";
import Watchlist from "./pages/Watchlist";
import Resources from "./pages/Resources";

const App = () => {
  const apiPrivate = useAxiosPrivate();
  const { Logout } = useAuth();

  useEffect(() => {
    const verify = async () => {
      try {
        const response = await apiPrivate.get('/users/verify/');
      } catch (error) {
        console.log("Invalid credential: " + error);
        Logout();
      }
    };

    verify();
  }, []);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-800 dark:text-gray-100">
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
            <Route path="resetPassword/:uidb64/:token"
              element={<ResetPassword
              />}
            />
            <Route path="dashboard" exact
              element={
                <DashboardContextProvider>
                  <Dashboard
                  />
                </DashboardContextProvider>
              }
            />
            <Route path="transactions" exact
              element={
                <TransactionsList
                />
              }
            />
            <Route path="wallet" exact
              element={
                <Wallet
                />
              }
            />
            <Route path="protected" exact
              element={
                <Protected
                />
              }
            />
            <Route path="about" exact
              element={
                <About
                />
              }
            />
            <Route path="setting" exact
              element={
                <Setting
                />
              }
            />
            <Route path="watchlist" exact
              element={
                <Watchlist
                />
              }
            />
            <Route path="resources" exact
              element={
                <Resources
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