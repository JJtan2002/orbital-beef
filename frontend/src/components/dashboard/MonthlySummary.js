import React from "react";
import { useDash } from "../../contexts/DashBoardContext";

const MonthlySummary = () => {
    const { wallet } = useDash();

    return (
        <div className="w-5/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-600">
            <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Monthly Summary</h2>
            <div className="mb-4">
                <label htmlFor="monthly-balance" className="block text-sm font-medium text-gray-700 dark:text-white">Current Amount</label>
                <div
                    id="monthly-balance"
                    className="bg-gray-50 rounded-lg block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                    {wallet.current_amount}
                </div>
                {/* <input type="text" id="monthly-balance" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" value={wallet.current_amount} readOnly /> */}
            </div>
            <div className="mb-4">
                <label htmlFor="monthly-income" className="block text-sm font-medium text-gray-700 dark:text-white">Monthly Earnings</label>
                <div
                    id="monthly-income"
                    className="bg-gray-50 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                    {wallet.monthly_earnings}
                </div>
                {/* <input type="text" id="monthly-income" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" value={wallet.monthly_earnings} readOnly /> */}
            </div>
            <div className="mb-4">
                <label htmlFor="monthly-expenses" className="block text-sm font-medium text-gray-700 dark:text-white">Monthly Expenses</label>
                <div
                    id="monthly-expenses"
                    className="bg-gray-50 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                >
                    {wallet.monthly_expenses}
                </div>
                {/* <input type="text" id="monthly-expenses" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" value={wallet.monthly_expenses} readOnly /> */}
            </div>
        </div>

    );
};

export default MonthlySummary;