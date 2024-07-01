import React from "react";
import { useDash } from "../../contexts/DashBoardContext";

const ExpenseList = () => {
    const { loading, expenses, handleDeleteTransaction } = useDash();

    return (
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
    );
};

export default ExpenseList;