import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTransactions } from "../hooks/useTransactions";
import { useWallet } from "../hooks/useWallet";
import { useLabels } from "../hooks/useLabels";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import { IconButton } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete"
import 'chart.js/auto';
import { LinearProgress } from '@mui/material';

const Wallet = () => {
    // hooks
    const { isLoggedIn, user } = useAuth();
    const { getWallet, updateWallet } = useWallet();
    const { getLabels, createLabel, deleteLabel, editLabel } = useLabels();
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
        data: wallet,
        isLoading: isPendingWallet,
        isError: isErrorWallet,
    } = useQuery({
        queryKey: ["api/wallet"],
        queryFn: () => getWallet(),
    });


    const { refetch: refetchLabels } = useQuery({
        queryKey: ["api/label"],
        queryFn: () => getLabels(),
    });
    const {
        data: labels,
        isLoading: isPendingLabels,
        isError: isErrorLabels,
    } = useQuery({
        queryKey: ["api/label"],
        queryFn: () => getLabels(),
    });

    const handleWallet = async (ev) => {
        ev.preventDefault();
        const formData = {
            value: ev.target.balance.value,
        };
        await updateWallet(formData);
        await refetchWallet();
        await refetchLabels();
        toast.success("Wallet Balance Changed!");
    }

    const handleLabel = async (ev) => {
        ev.preventDefault();

        const formData = {
            name: ev.target.name.value,
            color: ev.target.color.value,
            goal: parseInt(ev.target.goal.value),
            is_monthly: ev.target.is_monthly.checked,
        };

        await createLabel({ label: formData });
        await refetchWallet();
        await refetchLabels();
        toast.success("Label added!");
    }

    const handleLabelChange = async (ev) => {
        ev.preventDefault();
        const formData = {
            color: ev.target.color.value,
            goal: parseInt(ev.target.goal.value),
            is_monthly: ev.target.is_monthly.checked,
        };

        await editLabel({ label: formData, label_pk: ev.target.id.value });
        await refetchWallet();
        await refetchLabels();
        toast.success("Label added!");
    }

    const handleLabelDelete = async (labelId) => {
        console.log(labelId);
        await deleteLabel(labelId);
        await refetchWallet();
        await refetchLabels();
        toast.warning("Label deleted!");
    };


    return isLoggedIn && user && !isPendingWallet && !isPendingLabels && (
        <div className="flex flex-col items-center justify-center mt-5">
            {/* Wallet Information and Forms*/}
            <div className="flex w-full max-w-4xl bg-white justify-center">
                <div className="w-5/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Wallet Balance</h2>
                    <div className="mb-4">
                        <label htmlFor="monthly-balance" className="block text-sm font-medium text-gray-700 dark:text-white">Current Amount</label>
                        <input type="text" id="monthly-balance" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" value={wallet.current_amount} readOnly />
                    </div>
                    <form id="wallet-form" className="w-full" onSubmit={handleWallet}>
                        <div className="mb-4">
                            <input name="balance" type="number" step="0.01" id="balance" placeholder="Edit your wallet balance" required className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                        </div>
                        <button type="submit" className="w-full rounded-lg bg-purple-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                            Change Current Amount
                        </button>
                    </form>
                </div>
                {/* TODO: Add New Goal form*/}
                <div className="w-5/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Create Expense Label and Goal</h2>
                    <form id="transaction-form" className="w-full" onSubmit={handleLabel}>
                        <div className="mb-4">
                            <input name="name" type="text" id="name" placeholder="Label Name" required className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                        </div>
                        <div className="mb-4">
                            <input name="goal" type="number" step="0.01" id="goal" placeholder="Goal Amount" required className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="color" className="text-gray-900 dark:text-white">Color</label>
                            <input
                                name="color"
                                type="color"
                                id="color"
                                required
                                className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <label for="is_monthly" className="text-gray-900 dark:text-white">Monthly Goal?</label>
                            <input name="is_monthly" type="checkbox" id="is_monthly" className="ml-2 rounded dark:bg-gray-800 dark:text-white" />
                        </div>
                        <button type="submit" className="w-full rounded-lg bg-purple-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                            Add Label
                        </button>
                    </form>
                </div>
                {/* TODO: Adjust Goal form*/}
                <div className="w-5/12 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                    <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Edit Expense Category and Goal</h2>
                    <form id="transaction-form" className="w-full" onSubmit={handleLabelChange}>
                        <div className="mb-4">
                            <select name="id" id="id" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white">
                                <option value="" disabled selected>Select Label</option>
                                {/* TODO: Conditionally render based on label names */}
                                {labels.filter(label => label.is_expense).map((label) => (
                                    <option key={label.id} value={label.id}>{label.name}</option>
                                ))
                                }
                            </select>
                        </div>
                        <div className="mb-4">
                            <input name="goal" type="number" step="0.01" id="goal" placeholder="Goal Amount" required className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="color" className="text-gray-900 dark:text-white">Color</label>
                            <input
                                name="color"
                                type="color"
                                id="color"
                                required
                                className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                            />
                        </div>
                        <div className="mb-4">
                            <label for="is_monthly" className="text-gray-900 dark:text-white">Monthly Goal?</label>
                            <input name="is_monthly" type="checkbox" id="is_monthly" className="ml-2 rounded dark:bg-gray-800 dark:text-white" />
                        </div>
                        <button type="submit" className="w-full rounded-lg bg-purple-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                            Edit Label
                        </button>
                    </form>
                </div>
            </div>

            {/* Goals Grid */}
            <div className="w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h2 className="text-xl font-medium text-gray-900 dark:text-white mb-4">Labels and Goals</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {labels.filter(label => label.is_expense).map(label => {
                        const goal = label.goal;
                        return (
                            <div key={label.id} className="relative p-4 bg-gray-100 dark:bg-gray-700 rounded-lg shadow-md">
                                <IconButton
                                    aria-label="delete"
                                    size="small"
                                    className="absolute top-2 right-2 text-red-600"
                                    onClick={() => handleLabelDelete(label.id)}
                                >
                                    <DeleteIcon />
                                </IconButton>
                                <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">{label.name}</h3>
                                {goal ? (
                                    <>
                                        <LinearProgress variant="determinate" value={(label.current_amount / goal) * 100} />
                                        <p className="text-sm text-gray-600 dark:text-gray-300 mt-2">{`${label.current_amount} / ${goal}`}</p>
                                    </>
                                ) : (
                                    <p className="text-sm text-gray-600 dark:text-gray-300">No goal set</p>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default Wallet;