import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import axios from "axios";
import { toast } from "react-toastify";

const URL = process.env.REACT_APP_BACKEND_URL + "/users/login/";

const Login = () => {
    let navigate = useNavigate();

    const { isLoggedIn, Login } = useAuth();  
    const TokenObtainURL = process.env.REACT_APP_BACKEND_URL + "/api/token/";  
   
    useEffect(() => {
        if (isLoggedIn) {
            navigate("/");
        }
    }, [isLoggedIn, navigate]);


    const handleLogin = async (event) => {
        event.preventDefault();
        const email = event.target.email.value;
        const password = event.target.password.value;
        try {
            const response = await axios.post(TokenObtainURL, { email, password });
            const { access, refresh } = response.data;
            Login ({ access, refresh });
        } catch (error) {
            console.error('Login failed: ', error);
            toast.error("Login failed: " + error)
        }
      
    };

    return (
        <div className="w-full flex justify-center my-4">
            <div className="w-full max-w-lg p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">
                    Login to your account
                </h5>
                <form
                    className="w-full flex max-w-md flex-col gap-4"
                    onSubmit={handleLogin}
                >
                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="email" className="text-sm font-medium required">
                                Email
                            </label>
                        </div>
                        <input
                            id="email"
                            type="email"
                            name="email"
                            placeholder="Your Email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                            required
                        />
                    </div>
                    <div>
                        <div className="flex items-center justify-between mb-2 block">
                            <label
                                htmlFor="password"
                                className="text-sm font-medium required"
                            >
                                Password
                            </label>
                            <div className="text-sm">
                                <a
                                    href="forgotPassword"
                                    className="font-semibold text-purple-600 hover:text-purple-500"
                                >
                                    Forgot password?
                                </a>
                            </div>
                        </div>
                        <input
                            id="password"
                            type="password"
                            name="password"
                            placeholder="Your Password"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                            required
                        />
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                        <input
                            type="checkbox"
                            id="remember"
                            class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label htmlFor="remember" className="text-sm font-medium">
                            Remember me
                        </label>
                    </div>

                    <button
                        type="submit"
                        class="focus:outline-none hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
                        style={{ backgroundColor: "#66cccc" }}
                    >
                        Submit
                    </button>

                    <p className="text-center text-sm text-gray-500">
                        Not yet registered?{" "}
                        <a
                            href="register"
                            className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
                        >
                            Register Here
                        </a>
                    </p>
                </form>
            </div>
        </div>
    );
};

export default Login;