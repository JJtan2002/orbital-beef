import React from "react";
import { useDash } from "../../contexts/DashBoardContext";
import { Bar } from "react-chartjs-2";

const BarChart = () => {
    const { barData } = useDash();

    return (
        <div className="w-full max-w-4xl mt-6">
            <div className="w-full p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                <h2 className="mb-4 text-xl font-medium text-gray-900 dark:text-white">Daily Expenses</h2>
                <div className="h-80"> {/* Adjust the height of the container */}
                    <Bar data={barData} height={300} /> {/* Adjust the height of the chart */}
                </div>
            </div>
        </div>
    );

};

export default BarChart;