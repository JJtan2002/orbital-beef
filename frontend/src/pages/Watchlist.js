import React, { useState, useEffect } from 'react';
import { useWatchlist } from "../hooks/useWatchlist";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";

const Watchlist = () => {
    const [ticker, setTicker] = useState('');
    const [suggestions, setSuggestions] = useState([]);
    const { getWatchlist, createWatchlist, deleteWatchlist, getStockData } = useWatchlist();

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

    const { refetch: refetchStockData } = useQuery({
        queryKey: ["api/stockdata"],
        queryFn: () => getStockData(),
    });
    const {
        data: stockdata,
        isLoading: isPendingStockData,
        isError: isErrorStockData,
    } = useQuery({
        queryKey: ["api/stockdata"],
        queryFn: () => getStockData(),
    });

    const handleDelete = async (stock) => {
        const watchlistItem = watchlist.find(item => item.symbol === stock.ticker);
        console.log(watchlistItem);
        await deleteWatchlist(watchlistItem.id);
        await refetchWatchlist();
        return;
    };

    const handleAddTicker = async (ev) => {
        ev.preventDefault();

        const formData = {
            ticker: ev.target.ticker.value,
            entry: ev.target.entry.value,
        };
        await createWatchlist({ counter: formData });
        await refetchWatchlist();
        toast.success("Ticker added!");
    }

    const [search, setSearch] = useState('');
    const [selectedStock, setSelectedStock] = useState(null);


    const handleSearchChange = (e) => {
        setSearch(e.target.value);
    };

    /*const handleAddToWatchlist = (stock) => {
        setWatchlist([...watchlist, stock.name]);
    };

    const handleRemoveFromWatchlist = (stock) => {
        setWatchlist(watchlist.filter(item => item !== stock.name));
    };
    console.log(stockdata);
    const filteredStocks = stockdata.filter(stock =>
        stock.ticker.toLowerCase().includes(search.toLowerCase())
    );*/
    console.log(watchlist);
    return !isPendingWatchlist && !isPendingStockData && ((
        <div className="flex flex-col items-center justify-center mt-5">
            <main className="w-full max-w-4xl p-6 space-y-6">
                <div className="flex flex-wrap -mx-3">
                    <form className="watchlist bg-white p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-600 w-full md:w-1/2 px-3 mb-6 md:mb-0"
                        onSubmit={handleAddTicker}>
                        <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Add to Watchlist</h2>

                        <div className="relative mb-4">
                            <label htmlFor="ticker" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Ticker</label>
                            <select
                                id="ticker"
                                name="ticker"
                                className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white"
                            >
                                <option value="" disabled>Select a ticker</option>
                                {stockdata.map((stock) => (
                                    <option id="ticker" name="ticker" key={stock.ticker} value={stock.ticker}>{stock.ticker}</option>
                                ))
                                }
                            </select>
                        </div>

                        <div className="mb-4">
                            <input name="entry" type="number" step="0.01" id="entry" placeholder="Entry Price" required className="w-full p-2 border border-gray-300 rounded-md dark:bg-gray-700 dark:text-white" />
                        </div>

                        <button
                            type="submit"
                            className="mt-4 w-full p-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                        >
                            Add Ticker
                        </button>
                    </form>
                    <div className="stock-details bg-white p-6 border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-600 w-full md:w-1/2 px-3">
                        <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Stock Details</h2>
                        <div id="stock-info">
                            {selectedStock ? (
                                <div>
                                    <p className="text-sm text-gray-900 dark:text-white">Name: {selectedStock.ticker}</p>
                                    <p className="text-sm text-gray-900 dark:text-white">Price: ${selectedStock.close_price}</p>
                                    <p className="text-sm text-gray-900 dark:text-white">Change: {selectedStock.change}%</p>
                                </div>
                            ) : (
                                <p className="text-sm text-gray-900 dark:text-white">Select a stock to see details</p>
                            )}
                        </div>
                    </div>
                </div>
            </main>


            <section className="search-section w-full max-w-4xl p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-600">
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
                        {stockdata.filter(stock =>
                            watchlist.some(item => item.symbol.toLowerCase() === stock.ticker.toLowerCase()))
                            .filter(stock =>
                                stock.ticker.toLowerCase().includes(search.toLowerCase()))
                            .map(stock => (
                                <tr key={stock.name} className="hover:bg-gray-100 dark:hover:bg-gray-700">
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{stock.ticker}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">${stock.close_price}</td>
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
                                            onClick={() => handleDelete(stock)}
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
    ));
};

export default Watchlist;