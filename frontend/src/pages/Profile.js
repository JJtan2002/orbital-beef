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

const QUERY_LIMIT = 5;


const Profile = () => {

    // default date in transaction form to today
    const [dateValue, setDateValue] = useState(() => {
        // Initialize with today's date
        return new Date().toISOString().split('T')[0];
    });
    const handleDateChange = (event) => {
        setDateValue(event.target.value);
    };

    // hooks
    const { isLoggedIn, user } = useAuth();
    const { getTransactions, createTransaction, deleteTransaction } = useTransactions();
    const { getWallet } = useWallet();
    const { getLabels } = useLabels();


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
        data: wallet,
        isPending,
        isError,
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
        loading,
        error,
    } = useQuery({
        queryKey: ["api/transactions"],
        queryFn: () => getTransactions(QUERY_LIMIT),
    })

    const { refetch: refetchLabels } = useQuery({
        queryKey: ["api/label"],
        queryFn: () => getLabels(),
    });
    const {
        data: labels,
        isPendingLabels,
        isErrorLabels,
    } = useQuery({
        queryKey: ["api/label"],
        queryFn: () => getLabels(),
    });

    console.log(labels);

    const [transactionType, setTransactionType] = useState("Expense"); // State to track transaction type
    const expenseCategories = ["Food", "Transportation", "Housing", "Utilities", "Entertainment"];
    const incomeCategories = ["Salary", "Freelance Income", "Investment", "Gifts", "Other"];

    const handleTransaction = async (ev) => {
        ev.preventDefault();
        const date = new Date(ev.target.date.value);

        const formData = {
            title: ev.target.title.value,
            label: {
                id: 1,
            },
            value: parseInt(ev.target.amount.value),
            type: ev.target.type.value,
            date: dayjs(date).format("YYYY-MM-DD"),
        };

        await createTransaction({ transaction: formData });
        await refetchWallet();
        await refetchExpenses();
        toast.success("Transaction added!");
    }

    const handleDeleteTransaction = async (transactionId) => {
        await deleteTransaction(transactionId);
        await refetchWallet();
        await refetchExpenses();
        toast.warning("Transaction deleted!");
    };


    return isLoggedIn && user && !isPending && (
        <div className="flex flex-col items-center justify-center mt-5">

            {/* User Profile Card and Transaction Form*/}
            <div className="flex w-full max-w-4xl bg-white justify-center">
                {/* User Profile Card*/}
                <div className="w-7/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <div className="flex flex-col items-center pb-10">
                        <img alt="User Icon" width="96" height="96" src={UserIcon} className="mb-3 rounded-full shadow-lg" />
                        <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">{user.name}</h5>
                        <span className="text-sm text-gray-500 dark:text-gray-400">{user.email}</span>
                        <div className="mt-4 flex space-x-3 lg:mt-6">
                            <a href="#"
                                className="inline-flex items-center rounded-lg bg-purple-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                                Add friend
                            </a>
                            <a href="#"
                                className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                                Message
                            </a>
                        </div>
                    </div>
                </div>

                {/* Transaction Form*/}
                <div className="w-5/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Transaction</h2>
                    <form id="transaction-form" className="w-full" onSubmit={handleTransaction}>
                        <div className="mb-4">
                            <input name="title" type="text" id="description" placeholder="Description" required className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                        </div>
                        <div className="mb-4">
                            <input name="amount" type="number" id="amount" placeholder="Amount" required className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                        </div>
                        <div className="mb-4">
                            <select name="type" id="type" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                                onChange={(e) => setTransactionType(e.target.value)}>
                                <option value="" disabled selected>Select Type</option>
                                <option value="Expense">Expense</option>
                                <option value="Earning">Income</option>
                            </select>
                        </div>
                        <div className="mb-4">
                            <select name="label" id="category" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                                <option value="" disabled selected>Select Category</option>
                                {/* Conditionally render options based on transactionType */}
                                {transactionType === "Expense" && (
                                    expenseCategories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))
                                )}
                                {transactionType === "Earning" && (
                                    incomeCategories.map(category => (
                                        <option key={category} value={category}>{category}</option>
                                    ))
                                )}
                            </select>
                        </div>
                        <div className="mb-4">
                            <input name="date" type="date" id="date" placeholder="Date"
                                value={dateValue}
                                onChange={handleDateChange}
                                required className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                        </div>
                        <button type="submit" className="w-full rounded-lg bg-purple-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                            Add Transaction
                        </button>
                    </form>
                </div>

                <div className="w-5/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Monthly Summary</h2>
                    <div className="mb-4">
                        <label htmlFor="monthly-balance" className="block text-sm font-medium text-gray-700 dark:text-white">Current Amount</label>
                        <input type="text" id="monthly-balance" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" value={wallet.current_amount} readOnly />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="monthly-income" className="block text-sm font-medium text-gray-700 dark:text-white">Monthly Earnings</label>
                        <input type="text" id="monthly-income" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" value={wallet.monthly_earnings} readOnly />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="monthly-expenses" className="block text-sm font-medium text-gray-700 dark:text-white">Monthly Expenses</label>
                        <input type="text" id="monthly-expenses" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" value={wallet.monthly_expenses} readOnly />
                    </div>
                </div>
            </div>

            <div className="flex w-full max-w-4xl bg-white justify-center mt-6">
                <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Expense List</h2>
                    <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Label</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            {/* <tbody className="bg-white divide-y divide-gray-200">
                                <tr>
                                Loading...
                                </tr>
                            </tbody> */}
                            {loading ? (
                                <p>Loading...</p>
                            ) : expenses && (
                                <tbody className="bg-white divide-y divide-gray-200">
                                    {expenses.map((transaction) => (
                                        <tr key={transaction.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.value}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.label.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{transaction.title}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(transaction.date).toLocaleDateString()}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                <button onClick={() => {
                                                    handleDeleteTransaction({ transactionId: transaction.id });
                                                }} className="text-red-600 hover:text-red-900">Delete</button>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            )}

                        </table>
                    </div>
                </div>
            </div>

        </div>


    );
};

export default Profile;