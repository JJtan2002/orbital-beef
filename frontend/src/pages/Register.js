import { useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { useEffect, useState } from "react";

const URL = process.env.REACT_APP_BACKEND_URL + "/users/";
const Register = (props) => {
    const { setName, setEmail } = props;
    let navigate = useNavigate();

    const [isLoggedIn, setIsLoggedIn] = useState(
        () => localStorage.getItem("isLoggedIn") === "true"
    );

    useEffect(() => {
        if (isLoggedIn) {
            navigate("profile");
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

    const { name, email, password, error, success, loading } = values;

    const handleRegister = async (ev) => {
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
            const res = await axios.post(URL, formData);
            const data = res.data;
            if (data.id) {
                toast.success(data.message);
                setIsLoggedIn(true);
                localStorage.setItem("isLoggedIn", "true");
                localStorage.setItem("name", name);
                localStorage.setItem("email", email);
                setName(name);
                setEmail(email);
                navigate("/profile");
            } else {
                toast.error(data.message);
            }
        } catch (err) {
            toast.error("Some error occurred");
            console.log("Error:", err);
        }
    };

    return (
        <div className="w-full flex flex-col items-center justify-center px-6 py-8 mx-auto my-5 lg:py-0">
            <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-xl xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                    <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white text-center">
                        Create an account
                    </h1>
                    <form
                        className="space-y-4 md:space-y-"
                        action="POST"
                        onSubmit={handleRegister}
                    >
                        <div>
                            <div className="mb-2 block">
                                <label htmlFor="name" className="text-sm font-medium required">
                                    Name
                                </label>
                            </div>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                placeholder="Your Name"
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                                required
                            />
                        </div>

                        <div>
                            <div className="mb-2 block">
                                <label htmlFor="email" className="text-sm font-medium required">
                                    Email
                                </label>
                            </div>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                                placeholder="Your Email"
                                required
                            />
                        </div>

                        <div class="grid gap-6 mb-6 md:grid-cols-2">
                            <div>
                                <div className="mb-2 block">
                                    <label
                                        htmlFor="password"
                                        className="text-sm font-medium required"
                                    >
                                        Password
                                    </label>
                                </div>
                                <input
                                    type="password"
                                    name="password"
                                    id="password"
                                    placeholder="Your Password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                                    required
                                />
                            </div>
                            <div>
                                <div className="mb-2 block">
                                    <label
                                        htmlFor="confirmpassword"
                                        className="text-sm font-medium required"
                                    >
                                        Confirm Password
                                    </label>
                                </div>
                                <input
                                    type="password"
                                    name="confirmpassword"
                                    id="confirmpassword"
                                    placeholder="Re-enter Password"
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-purple-600 focus:border-purple-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                                    required
                                />
                            </div>
                        </div>


                        <div className="flex items-start">
                            <div className="flex items-center h-5">
                                <input
                                    id="terms"
                                    type="checkbox"
                                    class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 dark:focus:ring-purple-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                                    required
                                    aria-describedby="terms"
                                />
                            </div>
                            <div className="ml-3 text-sm">
                                <label
                                    htmlFor="terms"
                                    className="font-light text-gray-500 dark:text-gray-300"
                                >
                                    I accept the{" "}
                                    <a
                                        className="font-medium text-purple-600 hover:underline dark:text-purple-500"
                                        href="#"
                                    >
                                        Terms and Conditions
                                    </a>
                                </label>
                            </div>
                        </div>

                        <button
                            type="submit"
                            class="w-full font-bold focus:outline-none hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
                            style={{ backgroundColor: "#66cccc", color: "black" }}
                        >
                            Create an account
                        </button>
                        <p className="text-center text-sm text-gray-500">
                            Already have an account?{" "}
                            <a
                                href="login"
                                className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
                            >
                                Login Here
                            </a>
                        </p>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;