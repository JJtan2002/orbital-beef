import React, { createContext, useState, useEffect, useContext} from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import Cookies from 'js-cookies';

// create context
const AuthContext = createContext();


// create context provider
const AuthContextProvider = ({children}) => {
    const RegURL = process.env.REACT_APP_BACKEND_URL + "/users/";
    const LogURL = process.env.REACT_APP_BACKEND_URL + "/users/login/";

    const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("isLoggedIn") || false);
    const [name, setName] = useState(localStorage.getItem("name") || "");
    const [email, setEmail] = useState(localStorage.getItem("email") || "");

    useEffect(() => {
        if (localStorage.getItem("isLoggedIn") === "true") {
          setIsLoggedIn(true);
          setName(localStorage.getItem("name"));
          setEmail(localStorage.getItem("email"));
        }
      }, [isLoggedIn]);

    // handle login
    const [values, setValues] = useState({
        username: "",
        useremail: "",
        password: "",
        error: "",
        success: false,
        loading: false,
    });
    
    const signin = (user) => {
        const formData = new FormData();
        // append all info in user object to formData
        for (const name in user) {
            formData.append(name, user[name]);
        }
        for (var key of formData.keys()) {
            console.log("MYKEY", key);
        }

        return fetch(LogURL, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                console.log("SUCCESS", response);
                return response.json();
            })
            .catch((err) => console.log(err));
    };
    const Login = async (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        const email = event.target.email.value;
        const password = event.target.password.value;
        await signin({ email, password })
            .then((data) => {
                console.log("DATA", data);
                if (data.success) {
                    toast.success(data.message);
                    setIsLoggedIn(true);
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("name", data.user.name);
                    localStorage.setItem("email", email);
                    setEmail(email);
                    // navigate("/profile");
                } else {
                    toast.error(data.error);
                }
            })
            .catch((err) => console.log(err));
    };


    // handle register
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
            if (data.id) {
                toast.success(data.message);
                setIsLoggedIn(true);
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("name", name);
                localStorage.setItem("email", email);
                setName(name);
                setEmail(email);
                // navigate("/profile");
                console.log("Successful Registration.");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Some error occurred");
            console.log("Error:", err);
        }
    };

    // // handle log out
    const Logout = () => {
        setIsLoggedIn(false);
        console.log(isLoggedIn);
        localStorage.removeItem("isLoggedIn");
        setName(null);
        setEmail(null);
        localStorage.removeItem("name");
        localStorage.removeItem("email");
        console.log("name: " + name + " isLoggedIn: " + isLoggedIn);
        console.log("localStorage: " + localStorage.getItem("isLoggedIn"));
        // navigate("/");
        toast.success("You are successfully logged out!");
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, name, email, 
                                      setIsLoggedIn, setName, setEmail,
                                      Logout, Register, Login,
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