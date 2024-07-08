import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';

const Register = () => {
    const { Register, isLoggedIn, validateEmail, validatePassword } = useAuth();

    let navigate = useNavigate();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/dashboard");
        }
    }, [isLoggedIn, navigate]);


    const handleRegister = async (ev) => {
        ev.preventDefault();
        if (!validateEmail(ev.target.email.value)) {
            toast.error("Wrong email format");
            return;
        } 
        if (!validatePassword(ev.target.password.value)) {
            toast.error("Password should be at least 4 characters long");
            return;
        } 

        Register(ev);
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

                                    <Popup trigger={<button type="button" className="font-medium text-purple-600 hover:underline dark:text-purple-500">Terms and Conditions</button>} modal>
                                        {close => (
                                            <div className="modal bg-white rounded-lg shadow-lg p-6 max-w-3xl w-full">
                                                <button className="close" onClick={close}>&times;</button>
                                                <div className="header text-2xl font-semibold mb-4">Terms and Conditions</div>
                                                <div className="content overflow-y-scroll h-96">
                                                    <p className="mb-4">
                                                        Welcome to CashFlow! These terms and conditions outline the rules and regulations for the use of our website and services.
                                                    </p>
                                                    <h3 className="text-xl font-semibold mb-2">1. Introduction</h3>
                                                    <p className="mb-4">
                                                        By accessing this website we assume you accept these terms and conditions. Do not continue to use CashFlow if you do not agree to take all of the terms and conditions stated on this page.
                                                    </p>
                                                    <h3 className="text-xl font-semibold mb-2">2. Cookies</h3>
                                                    <p className="mb-4">
                                                        We employ the use of cookies. By accessing CashFlow, you agreed to use cookies in agreement with the CashFlow's Privacy Policy.
                                                    </p>
                                                    <h3 className="text-xl font-semibold mb-2">3. License</h3>
                                                    <p className="mb-4">
                                                        Unless otherwise stated, CashFlow and/or its licensors own the intellectual property rights for all material on CashFlow. All intellectual property rights are reserved. You may access this from CashFlow for your own personal use subjected to restrictions set in these terms and conditions.
                                                    </p>
                                                    <h3 className="text-xl font-semibold mb-2">4. User Comments</h3>
                                                    <p className="mb-4">
                                                        Parts of this website offer an opportunity for users to post and exchange opinions and information in certain areas of the website. CashFlow does not filter, edit, publish or review Comments prior to their presence on the website.
                                                    </p>
                                                    <h3 className="text-xl font-semibold mb-2">5. Content Liability</h3>
                                                    <p className="mb-4">
                                                        We shall not be held responsible for any content that appears on your Website. You agree to protect and defend us against all claims that are rising on your Website.
                                                    </p>
                                                    <h3 className="text-xl font-semibold mb-2">6. Your Privacy</h3>
                                                    <p className="mb-4">
                                                        We may collect certain personally identifiable information if you choose to provide it. This could include, but is not limited to, your name and email address (depending on your project's functionality). We may use your PII to respond to your inquiries and requests, send you information about our Service, and for internal 
                                                        administrative purposes. We take reasonable steps to protect your information from unauthorized access, disclosure, alteration, or destruction. However, no internet transmission or electronic storage method is completely secure. 
                                                        You may have the ability to access and update your PII through your account settings. You may also access the site's features by our test account.
                                                    </p>
                                                    <h3 className="text-xl font-semibold mb-2">7. Reservation of Rights</h3>
                                                    <p className="mb-4">
                                                        We reserve the right to request that you remove all links or any particular link to our Website. You approve to immediately remove all links to our Website upon request.
                                                    </p>
                                                    <h3 className="text-xl font-semibold mb-2">8. Removal of links from our website</h3>
                                                    <p className="mb-4">
                                                        If you find any link on our Website that is offensive for any reason, you are free to contact and inform us any moment. We will consider requests to remove links but we are not obligated to or so or to respond to you directly.
                                                    </p>
                                                    <p className="mt-6">
                                                        By using our website, you hereby consent to our Terms and Conditions and agree to its terms.
                                                    </p>
                                                </div>
                                            </div>
                                        )}
                                    </Popup>
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