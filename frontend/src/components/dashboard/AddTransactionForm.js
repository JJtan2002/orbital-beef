import React from "react";
import { useDash } from "../../contexts/DashBoardContext";
import { useState } from "react";
import { useRef } from "react";

const AddTransactionForm = () => {
    const { setTransactionType, handleDateChange, handleTransaction } = useDash();
    const { expenseCategories, incomeCategories, transactionType, dateValue } = useDash();

    // const [formState, setFormState] = useState({
    //     title: '',
    //     amount: '',
    //     type: '',
    //     label: '',
    //     // date: dateValue,
    // });

    const formRef = useRef(null);

    const cleanAfterSubmit = async (ev) => {
        try {
            await handleTransaction(ev);
            formRef.current.reset();
            formRef.current.querySelector('select[name="type"]').value = '';
            formRef.current.querySelector('select[name="label"]').value = '';
        } catch (err) {
            console.error(err);
        }
    
    };


    return (
        <div className="w-5/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add Transaction</h2>
            <form id="transaction-form" className="w-full" onSubmit={cleanAfterSubmit} ref={formRef}>
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
    );

};

export default AddTransactionForm;