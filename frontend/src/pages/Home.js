import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAuth } from "../contexts/AuthContext";
import { jwtDecode } from "jwt-decode";


const Home = () => {
    let navigate = useNavigate();

    const handleDashboardClick = () => {
        navigate('/dashboard'); // Navigate to 'register' path
    };

    const handleRegisterClick = () => {
        navigate('/register'); // Navigate to 'register' path
    };

    const { isLoggedIn, authTokens } = useAuth();
    /*
        useEffect(() => {
            if (isLoggedIn) {
                navigate("/profile");
                console.log("Jump to home");
                console.log(authTokens.access);
                console.log(jwtDecode(authTokens.access));
            }
        }, [isLoggedIn, navigate]);
      */
    return (
        <div>
            <h2 className="font-bold my-5 text-xl text-center">Welcome to CashFlow!</h2>
            <div>
                <p className="my-5 text-l text-center w-4/5 mx-auto">Streamline your money experience with CashFlow!
                    Here you can track your expenses, make your budgets, and generate financial reports.</p>
            </div>
            <div className="text-center w-20px">
                {isLoggedIn ? (
                    <a
                        href="dashboard"
                        onClick={handleDashboardClick}
                        className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
                    >
                        Go to Dashboard
                    </a>
                ) : (
                    <a
                        href="register"
                        onClick={handleRegisterClick}
                        className="font-semibold leading-6 text-purple-600 hover:text-purple-500"
                    >
                        Sign up and Explore!
                    </a>
                )}
            </div>
        </div>
    );
};

export default Home;