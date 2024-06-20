import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";
import { useTransactions } from "../hooks/useTransactions";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import { toast } from "react-toastify";

const TransactionsList = () => {
    const { isLoggedIn, user } = useAuth();
    const { getTransactions, deleteTransaction } = useTransactions();
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(15); // Number of items per page
    const [filter, setFilter] = useState("");

    let navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn)
            navigate("/");
    }, [isLoggedIn, navigate]);

    const { refetch: refetchTransactions } = useQuery({
        queryKey: ["api/transactions"],
        queryFn: () => getTransactions(0),
    });
    const {
        data: transactions,
        isLoading,
        isError,
    } = useQuery({
        queryKey: ["api/transactions"],
        queryFn: () => getTransactions(0),
    })

    if (isLoading) return <div>Loading...</div>;
    if (isError) return <div>Error loading transactions</div>;

    const handleDeleteTransaction = async (transactionId) => {
        await deleteTransaction(transactionId);
        await refetchTransactions();
        toast.warning("Transaction deleted!");
    };
    // Apply filter
    const filteredTransactions = transactions.filter(transaction =>
        transaction.title.toLowerCase().includes(filter.toLowerCase())
        || transaction.label.name.toLowerCase().includes(filter.toLowerCase())
        || transaction.value.toString().includes(filter.toLowerCase())
    );

    // Calculate current transactions to display based on currentPage and itemsPerPage
    const indexOfLastTransaction = currentPage * itemsPerPage;
    const indexOfFirstTransaction = indexOfLastTransaction - itemsPerPage;
    const currentTransactions = filteredTransactions.slice(indexOfFirstTransaction, indexOfLastTransaction);

    const handleFilterChange = (event) => {
        setFilter(event.target.value);
        setCurrentPage(1); // Reset to first page when filter changes
    };

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <div className="flex flex-col items-center justify-center mt-5">

            {/* Transactions List */}
            <div className="w-full max-w-4xl bg-white p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Transactions List</h2>

                {/* Filter */}
                <div className="mb-4">
                    <input
                        type="text"
                        value={filter}
                        onChange={handleFilterChange}
                        placeholder="Filter by title, amount, etc."
                        className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                    />
                </div>

                {/* Transaction Table */}
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
                        <tbody className="bg-white divide-y divide-gray-200">
                            {currentTransactions.map((transaction) => (
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
                    </table>
                </div>

                {/* Pagination */}
                <div className="mt-4 flex justify-between items-center">
                    <div>
                        <span className="text-sm font-medium text-gray-700">
                            Page {currentPage} of {Math.ceil(filteredTransactions.length / itemsPerPage)}
                        </span>
                    </div>
                    <div className="space-x-2">
                        {[...Array(Math.ceil(filteredTransactions.length / itemsPerPage)).keys()].map((pageNumber) => (
                            <button
                                key={pageNumber + 1}
                                onClick={() => handlePageChange(pageNumber + 1)}
                                className={`px-3 py-1 rounded-lg border text-sm ${currentPage === pageNumber + 1 ? 'bg-purple-700 text-white' : 'border-gray-300 text-gray-700 hover:bg-gray-100 hover:border-gray-400'}`}
                            >
                                {pageNumber + 1}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionsList;