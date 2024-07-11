import React, { useState, useEffect } from 'react';
import { useWatchlist } from "../hooks/useWatchlist";
import { useQuery } from "@tanstack/react-query";

const Watchlist = () => {
    const [counter, setCounter] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const { getWatchlist } = useWatchlist();

    const { refetch: refetchWatchlist } = useQuery({
        queryKey: ["api/watchlist"],
        queryFn: () => getWatchlist(),
    });
    const {
        data: watchlist,
        isLoading: isPendingWatchlist,
        isError: isErrorWatchlist,
    } = useQuery({
        queryKey: ["api/watchlist"],
        queryFn: () => getWatchlist(),
    });

    const handleInputChange = (e) => {
        const value = e.target.value;
        setCounter(value);

        // Fetch or filter suggestions based on the input value
        // Replace this with your actual suggestions logic
        const allSuggestions = ['AAPL', 'GOOGL', 'MSFT', 'AMZN']; // Example suggestions
        const filteredSuggestions = allSuggestions.filter(suggestion =>
            suggestion.toLowerCase().includes(value.toLowerCase())
        );
        setSuggestions(filteredSuggestions);
    };

    const handleAddCounter = () => {
        // Add counter to the watchlist
        console.log('Counter added:', counter);
        // Clear the input field and suggestions after adding
        setCounter('');
        setSuggestions([]);
    };

    const handleSuggestionClick = (suggestion) => {
        setCounter(suggestion);
        setSuggestions([]);
    };

    const [search, setSearch] = useState('');
    const [stocks, setStocks] = useState([]);
    const [selectedStock, setSelectedStock] = useState(null);

    // Fetch data for stocks and watchlist (dummy data for now)
    useEffect(() => {
        // Fetch stocks and watchlist data
        setStocks([
            { name: 'AAPL', price: 145, change: 1.2 },
            { name: 'GOOG', price: 2725, change: -0.3 },
            { name: 'AMZN', price: 3342, change: 0.5 },
        ]);
        setWatchlist(['AAPL', 'AMZN']);
    }, []);

    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    const handleAddToWatchlist = (stock) => {
        setWatchlist([...watchlist, stock.name]);
    };

    const handleRemoveFromWatchlist = (stock) => {
        setWatchlist(watchlist.filter(item => item !== stock.name));
    };

    const filteredStocks = stocks.filter(stock =>
        stock.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
        <div className="flex flex-col items-center justify-center mt-5">
            <main className="w-full max-w-4xl p-6 space-y-6">
                <div className="flex flex-wrap -mx-3">
                    <form className="watchlist bg-white p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full md:w-1/2 px-3 mb-6 md:mb-0" onSubmit={handleAddCounter}>
                        <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add to Watchlist</h2>
                        <div className="relative">
                            <input
                                type="text"
                                value={counter}
                                onChange={handleInputChange}
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                                placeholder="Counter"
                            />
                            {suggestions.length > 0 && (
                                <ul className="absolute left-0 right-0 bg-white border border-gray-300 rounded-md dark:bg-gray-700 dark:border-gray-600 dark:text-white mt-1">
                                    {suggestions.map((suggestion, index) => (
                                        <li
                                            key={index}
                                            className="p-2 cursor-pointer hover:bg-gray-200 dark:hover:bg-gray-600"
                                            onClick={() => handleSuggestionClick(suggestion)}
                                        >
                                            {suggestion}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                        <button
                            type="submit"
                            className="mt-4 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Add Counter
                        </button>
                    </form>
                    <div className="stock-details bg-white p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 w-full md:w-1/2 px-3">
                        <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Stock Details</h2>
                        <div id="stock-info">
                            {selectedStock ? (
                                <div>
                                    <p className="text-sm text-gray-900 dark:text-white">Name: {selectedStock.name}</p>
                                    <p className="text-sm text-gray-900 dark:text-white">Price: ${selectedStock.price}</p>
                                    <p className="text-sm text-gray-900 dark:text-white">Change: {selectedStock.change}%</p>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-900 dark:text-white">Select a stock to see details</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>
            <section className="search-section w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <input
                    type="text"
                    id="search"
                    value={search}
                    onChange={handleSearchChange}
                    placeholder="Search for stocks..."
                    className="w-full p-2 mb-4 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white"
                />
                <table className="min-w-full divide-y divide-gray-200">
                    <thead className="bg-gray-50">
                        <tr>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Stock Name</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Price</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Change</th>
                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">View</th>
                        </tr>
                    </thead>
                    <tbody className="bg-white divide-y divide-gray-200">
                        {filteredStocks.map(stock => (
                            <tr key={stock.name} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{stock.name}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${stock.price}</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{stock.change}%</td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    <button
                                        onClick={() => setSelectedStock(stock)}
                                        className="text-green-600 hover:text-green-900"
                                    >
                                        View Details
                                    </button>
                                </td>
                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                                    <button
                                        onClick={() => setSelectedStock(stock)}
                                        className="text-red-600 hover:text-red-900"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </section>
        </div>
    );
};

export default Watchlist;