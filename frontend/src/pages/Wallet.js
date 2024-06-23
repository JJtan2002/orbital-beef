import { useEffect, useState } from "react";
import UserIcon from "../images/user.png";
import { redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTransactions } from "../hooks/useTransactions";
import { useWallet } from "../hooks/useWallet";
import { useLabels } from "../hooks/useLabels";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "react-toastify";
import 'chart.js/auto';
import { LinearProgress } from '@mui/material';

const Wallet = () => {
    // Placeholder data
    const loading = false;
    const walletData = {
        current_amount: 1500,
        monthly_earnings: 2000,
        monthly_expenses: 500,
    };

    const labelsData = [
        { id: 1, name: 'Groceries' },
        { id: 2, name: 'Rent' },
        { id: 3, name: 'Utilities' },
        { id: 4, name: 'Entertainment' },
        { id: 5, name: 'Savings' },
        { id: 6, name: 'Transportation' },
    ];

    const goalsData = [
        { labelId: 1, goal: 300 },  // Groceries
        { labelId: 2, goal: 1000 }, // Rent
        { labelId: 3, goal: 150 },  // Utilities
        { labelId: 4, goal: 200 },  // Entertainment
        { labelId: 5, goal: 500 },  // Savings
        { labelId: 6, goal: 100 },  // Transportation
    ];


    const [wallet, setWallet] = useState(walletData);
    const [labels, setLabels] = useState(labelsData);
    const [goals, setGoals] = useState(goalsData);

    // hooks
    const { isLoggedIn, user } = useAuth();
    const { getTransactions, createTransaction, deleteTransaction } = useTransactions();
    const { getWallet } = useWallet();
    const { getLabels } = useLabels();
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [incomeCategories, setIncomeCategories] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn)
            navigate("/");
    }, [isLoggedIn]);

    const { refetch: refetchWallet } = useQuery({
        queryKey: ["api/wallet"],
        queryFn: () => getWallet(),
    });
    const {
        data: myWallet,
        isPendingWallet,
        isErrorWallet,
    } = useQuery({
        queryKey: ["api/wallet"],
        queryFn: () => getWallet(),
    });

    const { refetch: refetchExpenses } = useQuery({
        queryKey: ["api/transactions"],
        queryFn: () => getTransactions(QUERY_LIMIT),
    });
    const {
        data: expenses,
        isLoadingExpenses,
        isErrorExpenses,
    } = useQuery({
        queryKey: ["api/transactions"],
        queryFn: () => getTransactions(QUERY_LIMIT),
    })

    const { refetch: refetchLabels } = useQuery({
        queryKey: ["api/label"],
        queryFn: () => getLabels(),
    });
    const {
        data: myLabels,
        isPendingLabels,
        isErrorLabels,
    } = useQuery({
        queryKey: ["api/label"],
        queryFn: () => getLabels(),
    });

    console.log(myLabels);

    return (
        <div className="flex flex-col items-center justify-center mt-5">
            {/* Wallet Information and Forms*/}
            <div className="flex w-full max-w-4xl bg-white justify-center">
                <div className="w-5/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Monthly Summary</h2>
                    <div className="mb-4">
                        <label htmlFor="monthly-balance" className="block text-sm font-medium text-gray-700 dark:text-white">Current Amount</label>
                        <input type="text" id="monthly-balance" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" value={1} readOnly />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="monthly-income" className="block text-sm font-medium text-gray-700 dark:text-white">Monthly Earnings</label>
                        <input type="text" id="monthly-income" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" value={1} readOnly />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="monthly-expenses" className="block text-sm font-medium text-gray-700 dark:text-white">Monthly Expenses</label>
                        <input type="text" id="monthly-expenses" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" value={1} readOnly />
                    </div>
                </div>
                {/* TODO: Add New Goal form*/}
                <div className="w-5/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Label</h2>
                    <form id="transaction-form" className="w-full" onSubmit={1}>
                        <div className="mb-4">
                            <input name="title" type="text" id="description" placeholder="Description" required className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                        </div>
                        <button type="submit" className="w-full rounded-lg bg-purple-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                            Add Transaction
                        </button>
                    </form>
                </div>
                {/* TODO: Adjust Goal form*/}
                <div className="w-5/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Label</h2>
                    <form id="transaction-form" className="w-full" onSubmit={1}>
                        <div className="mb-4">
                            <input name="title" type="text" id="description" placeholder="Description" required className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                        </div>
                        <button type="submit" className="w-full rounded-lg bg-purple-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                            Add Transaction
                        </button>
                    </form>
                </div>
            </div>

            {/* Goals Grid */}
            <div className="w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Goals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {labels.map(label => {
                        const goal = goals.find(g => g.labelId === label.id);
                        return goal ? (
                            <div key={label.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{label.name}</h3>
                                <LinearProgress variant="determinate" value={(wallet.current_amount / goal.goal) * 100} />
                                <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{`${wallet.current_amount} / ${goal.goal}`}</p>
                            </div>
                        ) : (
                            <div key={label.id} className="p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{label.name}</h3>
                                <p className="text-sm text-gray-600 dark:text-gray-300">No goal set</p>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Wallet;