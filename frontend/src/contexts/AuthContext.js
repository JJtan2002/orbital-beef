import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

// create context
const AuthContext = createContext();


// create context provider
const AuthContextProvider = ({ children }) => {
    const RegURL = process.env.REACT_APP_BACKEND_URL + "/users/signup/";
    const RefreshURL = process.env.REACT_APP_BACKEND_URL + "/api/token/refresh/";

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") || false);
    const [authTokens, setAuthTokens] = useState(() => {
        const access = localStorage.getItem('access_token');
        const refresh = localStorage.getItem('refresh_token');
        return { access, refresh };
    });
    const [user, setUser] = useState(() => {
        const token = localStorage.getItem('access_token');
        return token ? jwtDecode(token) : null;
    });


    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") === "true" && authTokens.access) {
            setIsLoggedIn(true);
            setAuthTokens({
                access: localStorage.getItem('access_token'),
                refresh: localStorage.getItem('refresh_token'),
            });
            setUser(jwtDecode(authTokens.access));
        }
    }, [isLoggedIn]);

    useEffect(() => {
        if (authTokens.access) {
            const decodedToken = jwtDecode(authTokens.refresh);
            if (decodedToken.exp * 1000 < Date.now()) {
                setAuthTokens({ access: null, refresh: null });
                setUser(null);
                setIsLoggedIn(false);
                localStorage.removeItem('access_token');
                localStorage.removeItem('refresh_token');
                localStorage.removeItem('isLoggodIn')
            }
        }
    }, [authTokens]);

    /**
     * Handle Login
     */
    const Login = (tokens) => {
        setAuthTokens({
            access: tokens.access,
            refresh: tokens.refresh,
        });
        const decodedToken = jwtDecode(tokens.access);
        console.log(decodedToken);
        localStorage.setItem('access_token', tokens.access);
        localStorage.setItem('refresh_token', tokens.refresh);
        localStorage.setItem("isLoggedIn", "true");
        setUser(decodedToken);
        setIsLoggedIn(true);
        console.log(authTokens.access);
    };


    /**
     * Handle Register
     * @param {*} ev 
     * @returns 
     */
    const Register = async (ev) => {
        ev.preventDefault();
        const name = ev.target.name.value;
        const email = ev.target.email.value;
        const password = ev.target.password.value;
        const confirmpassword = ev.target.confirmpassword.value;
        if (password !== confirmpassword) {
            toast.error("Passwords do not match!");
            return;
        }

        const formData = { name, email, password };

        try {
            const res = await axios.post(RegURL, formData);
            const data = res.data;
            if (data.access) {
                toast.success(data.message);
                setIsLoggedIn(true);
                setAuthTokens({
                    'access': data.access,
                    'refresh': data.refresh,
                })
                setUser(jwtDecode(data.access));
                console.log(user);
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("access_token", data.access);
                localStorage.setItem("refresh_token", data.refresh);

                // navigate("/profile");
                console.log("Successful Registration.");
            } else {
                toast.error(data.error);
            }
        } catch (err) {
            if (err.response) {
                // Server responded with a status other than 200 range
                if (err.response.status === 409) {
                    toast.error("Account with this email already exists.");
                } else if (err.response.status === 405) {
                    toast.error("Method Not Allowed.");
                } else {
                    toast.error(err.response.data.error || "Some error occurred");
                }
            } else if (err.request) {
                // Request was made but no response was received
                toast.error("No response from server.");
            } else {
                // Something happened in setting up the request
                toast.error("Error: " + err.message);
            }
            console.log("Error:", err);
        }
    };

    /**
     * Handle Logout
     */
    const Logout = () => {
        setAuthTokens({
            access: null,
            refresh: null,
        });
        setUser(null);
        setIsLoggedIn(false);
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
    }

    /**
     * Handle refresh
     */
    const refresh = async () => {
        const response = await axios.post(RefreshURL, {
            refresh: authTokens.refresh,
        });
        const newTokens = response.data;
        setAuthTokens(newTokens);
        console.log("Token refresh! Success!");
        setUser(jwtDecode(newTokens.access));
        localStorage.setItem("access_token", newTokens.access);
        localStorage.setItem("refresh_token", newTokens.refresh);
        return newTokens.access;
    }

    return (
        <AuthContext.Provider value={{
            isLoggedIn, authTokens, user,
            setIsLoggedIn, setAuthTokens, setUser,
            Logout, Register, Login, refresh,
        }}>
            {children}
        </AuthContext.Provider>
    );

}


//create Custom hook
const useAuth = () => {
    return useContext(AuthContext);
}

// export the hook
export { useAuth, AuthContextProvider };