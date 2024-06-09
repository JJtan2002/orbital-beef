import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../contexts/AuthContext";


const Home = () => {
    let navigate = useNavigate();

    const { isLoggedIn } = useAuth();

    useEffect(() => {
        if (isLoggedIn) {
            navigate("/profile");
            console.log("Jump to home");
        }
    });
    return (
        <div>
            <h2 className="font-bold my-5 text-xl text-center">Welcome to CashFlow!</h2>
            <div>
                <p className="my-5 text-l text-center w-4/5 mx-auto">Streamline your money experience with CashFlow!
                    Here you can track your epenses, make your budgets, and generate financial reports.</p>
            </div>
            <div className="text-center w-20px">
                <a
                    href="register"
                    className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
                >
                    Sign up and Explore!
                </a>
            </div>
            {isLoggedIn ? (
                <a
                    href="profile"
                    className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
                >
                    Go to Dashboard
                </a>
            ) : (
                ""
            )}
        </div>
    );
};

export default Home;