import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const URL = process.env.REACT_APP_BACKEND_URL + "/users/login/";

const Login = (props) => {
    let navigate = useNavigate();
    const { setName, setEmail } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(
        () => localStorage.getItem("isLoggedIn")
    );

    useEffect(() => {
        if (isLoggedIn) {
            navigate("");
        }
    }, [isLoggedIn, navigate]);

    const [values, setValues] = useState({
        name: "",
        email: "",
        password: "",
        error: "",
        success: false,
        loading: false,
    });
    const {
        name,
        email,
        password,
        error,
        success,
        loading,
        didRedirect,
    } = values;



    /*const handleLogin = async (ev) => {
        ev.preventDefault();
        const email = ev.target.email.value;
        const password = ev.target.password.value;
        const formData = { "email": email, "password": password };
        const res = await axios.post(URL, formData);
        const data = res.data;
        console.log(data);
        if (data.token) {
            toast.success(data.message);
            setIsLoggedIn(true);
            setEmail(email);
            navigate("/profile");
        } else {
         toast.error("Wrong email or password! Please try again.");
        }
    };*/
    const signin = (user) => {
        const formData = new FormData();

        for (const name in user) {
            formData.append(name, user[name]);
        }

        for (var key of formData.keys()) {
            console.log("MYKEY", key);
        }

        return fetch(URL, {
            method: "POST",
            body: formData,
        })
            .then((response) => {
                console.log("SUCCESS", response);
                return response.json();
            })
            .catch((err) => console.log(err));

    };


    const handleLogin = async (event) => {
        event.preventDefault();
        setValues({ ...values, error: false, loading: true });
        const email = event.target.email.value;
        const password = event.target.password.value;
        await signin({ email, password })
            .then((data) => {
                console.log("DATA", data);
                if (data.token) {
                    toast.success(data.message);
                    setIsLoggedIn(true);
                    localStorage.setItem("isLoggedIn", "true");
                    localStorage.setItem("name", name);
                    localStorage.setItem("email", email);
                    setEmail(email);
                    navigate("/profile");
                } else {
                    toast.error("Wrong email or password! Please try again.");
                }
            })
            .catch((err) => console.log(err));
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