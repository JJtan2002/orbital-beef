import { useEffect } from "react";
import UserIcon from "../images/user.png";
import { redirect, useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";

const Profile = () => {
    const { isLoggedIn, user } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn)
            navigate("/");
    }, [isLoggedIn]);

    return isLoggedIn && (
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
                <div className="w-5/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700" >
                    <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Transaction</h2>
                    <form id="transaction-form" className="w-full">
                        <div className="mb-4">
                            <input type="text" id="description" placeholder="Description" required
                                className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                        </div>
                        <div className="mb-4">
                            <input type="number" id="amount" placeholder="Amount" required
                                className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                        </div>
                        <div className="mb-4">
                            <select id="type" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                                <option value="expense">Expense</option>
                                <option value="income">Income</option>
                            </select>
                        </div>
                        <button type="submit"
                            className="w-full rounded-lg bg-purple-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                            Add Transaction
                        </button>
                    </form>
                </div>

                <div className="w-5/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Monthly Summary</h2>
                    <div className="mb-4">
                        <label htmlFor="monthly-balance" className="block text-sm font-medium text-gray-700 dark:text-white">Monthly Balance</label>
                        <input type="text" id="monthly-balance" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" readOnly />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="monthly-income" className="block text-sm font-medium text-gray-700 dark:text-white">Monthly Income</label>
                        <input type="text" id="monthly-income" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" readOnly />
                    </div>
                    <div className="mb-4">
                        <label htmlFor="monthly-expenses" className="block text-sm font-medium text-gray-700 dark:text-white">Monthly Expenses</label>
                        <input type="text" id="monthly-expenses" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" readOnly />
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
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {/* Replace with your dynamic data */}
                                <tr>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">100</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Food</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">Lunch at restaurant</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">2024-06-15</td>
                                </tr>
                                {/* Additional rows */}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>


    );
};

export default Profile;