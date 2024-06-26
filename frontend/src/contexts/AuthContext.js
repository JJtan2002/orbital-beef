import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import { jwtDecode } from 'jwt-decode';

// create context
const AuthContext = createContext();


// create context provider
const AuthContextProvider = ({ children }) => {
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