import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import 'chart.js/auto';
import ProfileCard from "../components/dashboard/ProfileCard";
import AddTransactionForm from "../components/dashboard/AddTransactionForm";
import MonthlySummary from "../components/dashboard/MonthlySummary";
import BarChart from "../components/dashboard/BarChart";
import PieChart from "../components/dashboard/PieChart";
import ExpenseList from "../components/dashboard/ExpenseList";
import { useDash } from "../contexts/DashBoardContext";
import { usePro } from "../contexts/ProfileContext";

// const QUERY_LIMIT = 5;


const Dashboard = () => {

    // hooks
    const { isLoggedIn, user } = useAuth();
    const { isPending } = useDash();
    const { isPendingProfile } = usePro()

    let navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn)
            navigate("/");
    }, [isLoggedIn]);


    return isLoggedIn && user && !isPending && !isPendingProfile && (
        <div className="flex flex-col items-center justify-center mt-5 bg-white min-h-screen dark:bg-gray-800">
            <div className="mx-auto flex flex-col items-center justify-center mt-5 mb-6 min-h-screen dark:bg-gray-800">

                {/* User Profile Card and Transaction Form*/}
                <div className="flex flex-wrap w-full max-w-4xl bg-white justify-center dark:bg-gray-800">
                    <ProfileCard/>
                    <AddTransactionForm/>
                    <MonthlySummary/>
                </div>

                <div className="flex flex-wrap w-full max-w-4xl bg-white justify-center dark:bg-gray-800">
                    {/* Bar Chart for Daily Expenses */}
                    <BarChart/>
                    {/* Pie Chart for Expense Distribution */}
                    <PieChart/>
                </div>

                <div className="flex w-full max-w-4xl bg-white justify-center dark:bg-gray-800">
                     {/* 5 Line Short Expense List */}
                    <ExpenseList/>
                </div>

            </div>
        </div>


    );
};

export default Dashboard;