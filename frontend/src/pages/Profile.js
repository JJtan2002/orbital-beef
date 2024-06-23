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
import { Bar, Pie } from 'react-chartjs-2';
import 'chart.js/auto';

// const QUERY_LIMIT = 5;


const Profile = () => {

    // default date in transaction form to today
    const [dateValue, setDateValue] = useState(() => {
        // Initialize with today's date
        return new Date().toISOString().split('T')[0];
    });
    const handleDateChange = (event) => {
        setDateValue(event.target.value);
    };
    const [dateForDisplay, setDates] = useState({ today: '', fiveDaysAgo: '' });


    // hooks
    const { isLoggedIn, user } = useAuth();
    const { getTransactions, createTransaction, deleteTransaction } = useTransactions();
    const { getWallet } = useWallet();
    const { getLabels } = useLabels();
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [incomeCategories, setIncomeCategories] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        // Get today's date
        const today = new Date();
        // Get the date 5 days ago
        const fiveDaysAgo = new Date(today);
        fiveDaysAgo.setDate(today.getDate() - 5);
     
        // Update state with formatted dates
        setDates({ today: today, fiveDaysAgo: fiveDaysAgo });
    }, []);

    useEffect(() => {
        if (!isLoggedIn)
            navigate("/");
    }, [isLoggedIn]);


    const {
        refetch: refetchWallet,
        data: wallet,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["api/wallet"],
        queryFn: () => getWallet(),
    });
 
    const {
        refetch: refetchExpenses,
        data: expenses,
        loading,
        error,
    } = useQuery({
        queryKey: ["api/transactions"],
        queryFn: () => getTransactions(5, 0),
    })

    const {
        refetch: refetchLabels,
        data: labels,
        isPendingLabels,
        isErrorLabels,
    } = useQuery({
        queryKey: ["api/label"],
        queryFn: () => getLabels(),
    });

    const {
        refetch: refetchBardata,
        data: bardata,
        isPendingBardata,
        isErrorBardata,
    } = useQuery({
        queryKey: ["api/bardata"],
        queryFn: () => getTransactions(
            /*limit:*/ 0,
            /*charType:*/ 1,
            /*startDate:*/ dateForDisplay.fiveDaysAgo,
            /*endDate:*/ dateForDisplay.today,
        ),
    })

    const {
        refetch: refetchPiedata,
        data: piedata,
        isPendingPiedata,
        isErrorPiedata,
    } = useQuery({
        queryKey: ["api/piedata"],
        queryFn: () => getTransactions(
            0,
            2,
            dateForDisplay.fiveDaysAgo,
            dateForDisplay.today,
        ),
    }) 


    var barData = {
        labels: ['Loading'],
        datasets: [
            {
                label: 'Daily Expenses',
                data: [0],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    if (!isErrorBardata && !isPendingBardata && bardata) {
        const sortbardata = bardata.sort((a, b) => new Date(a.date) - new Date(b.date));
        barData = {
            labels: sortbardata.map((day) => day.date),
            // labels: ['2024-06-15', '2024-06-16', '2024-06-17', '2024-06-18', '2024-06-19', '2024-06-20'],
            datasets: [
                {
                    label: 'Daily Expenses',
                    // data: [50, 100, 75, 125, 150, 200, 175],
                    data: sortbardata.map(day => day.value),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    }
    
    var pieData = {
        labels: ['Rent', 'Groceries', 'Utilities', 'Entertainment', 'Transport', 'Others'],
        datasets: [
            {
                data: [500, 300, 200, 100, 150, 50],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };

    if (!isErrorPiedata && !isPendingPiedata && piedata) {
        pieData = {
            labels: piedata.map(cate => cate.label_name),
            datasets: [
                {
                    data: piedata.map(cate => cate.value),
                    backgroundColor: piedata.map(cate => cate.label_color),
                    hoverBackgroundColor: piedata.map(cate => cate.label_color),
                },
            ],
        };
    }

    useEffect(() => {
        const fetchLabels = async () => {
            if (!isPendingLabels && !isErrorLabels && labels) {
                setExpenseCategories(labels.slice(0, 4).map((i) => [i["id"], i["name"]]));
                setIncomeCategories(labels.slice(5,).map((i) => [i["id"], i["name"]]));
            }
        };

        fetchLabels();
    }, [labels, isPendingLabels, isErrorLabels]);

    const [transactionType, setTransactionType] = useState("Expense"); // State to track transaction type

    const handleTransaction = async (ev) => {
        ev.preventDefault();
        const date = new Date(ev.target.date.value);

        const formData = {
            title: ev.target.title.value,
            label: {
                id: ev.target.label.value,
            },
            value: parseInt(ev.target.amount.value),
            type: ev.target.type.value,
            date: dayjs(date).format("YYYY-MM-DD"),
        };

        await createTransaction({ transaction: formData });
        await refetchWallet();
        await refetchExpenses();
        await refetchBardata();
        await refetchPiedata();
        toast.success("Transaction added!");
    }

    const handleDeleteTransaction = async (transactionId) => {
        await deleteTransaction(transactionId);
        await refetchWallet();
        await refetchExpenses();
        toast.warning("Transaction deleted!");
    };


    return isLoggedIn && user && !isPending && (
        <div className="flex flex-row items-center justify-center mt-5">
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
                                        expenseCategories.map((category) => (
                                            <option key={category[0]} value={category[0]}>{category[1]}</option>
                                        ))
                                    )}
                                    {transactionType === "Earning" && (
                                        incomeCategories.map((category, index) => (
                                            <option key={category[0]} value={category[0]}>{category[1]}</option>
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

                <div className="flex w-full max-w-4xl bg-white justify-center">
                    {/* Bar Chart for Daily Expenses */}
                    <div className="w-full max-w-4xl mt-6">
                        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Daily Expenses</h2>
                            <div className="h-80"> {/* Adjust the height of the container */}
                                <Bar data={barData} height={300} /> {/* Adjust the height of the chart */}
                            </div>
                        </div>
                    </div>

                    {/* Pie Chart for Expense Distribution */}
                    <div className="w-full max-w-4xl mt-6">
                        <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                            <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Expense Distribution</h2>
                            <div className="h-80"> {/* Adjust the height of the container */}
                                <Pie data={pieData} height={300} /> {/* Adjust the height of the chart */}
                            </div>
                        </div>
                    </div>
                </div>

                {/* 5 Line Short Expense List */}
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
        </div>


    );
};

export default Profile;