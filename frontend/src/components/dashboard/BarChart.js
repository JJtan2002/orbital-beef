import React, { useContext } from 'react';
import { Bar } from 'react-chartjs-2';
import { useDash } from '../../contexts/DashBoardContext';
import { DashboardContextProvider } from '../../contexts/DashBoardContext';

const BarChart = () => {
    const { barData, barDays, setBarDays } = useDash(DashboardContextProvider);

    const handleDaysChange = (event) => {
        setBarDays(parseInt(event.target.value, 10));
    };

    return (
        <div className="w-full max-w-4xl mt-6">
            <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-600">
                <div className="flex justify-between items-center mb-4">
                    <h2 className="text-xl font-medium text-gray-900 dark:text-white">Daily Expenses</h2>
                    <select
                        value={barDays}
                        onChange={handleDaysChange}
                        className="p-2 border border-gray-300 rounded-lg dark:bg-gray-700 dark:text-white"
                    >
                        <option value={5}>Last 5 days</option>
                        <option value={10}>Last 10 days</option>
                        <option value={15}>Last 15 days</option>
                        <option value={30}>Last 30 days</option>
                    </select>
                </div>
                <div className="h-80"> {/* Adjust the height of the container */}
                    <Bar data={barData} height={300} /> {/* Adjust the height of the chart */}
                </div>
            </div>
        </div>
    );
};

export default BarChart;