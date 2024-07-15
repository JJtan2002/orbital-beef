import React from 'react';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../contexts/AuthContext";


const resources = [
    {
        title: "Investopedia",
        description: "A comprehensive resource for financial education, offering articles, tutorials, and dictionary definitions on a wide range of financial topics.",
        link: "https://www.investopedia.com"
    },
    {
        title: "NerdWallet",
        description: "Provides expert advice, tools, and recommendations on personal finance, including credit cards, loans, investing, and more.",
        link: "https://www.nerdwallet.com"
    },
    {
        title: "The Balance",
        description: "Features articles on personal finance, investing, saving, and managing money, with practical tips and strategies.",
        link: "https://www.thebalance.com"
    },
    {
        title: "Morningstar",
        description: "Offers investment research, data, and analysis, including insights on stocks, mutual funds, ETFs, and retirement planning.",
        link: "https://www.morningstar.com"
    },
    {
        title: "Yahoo Finance",
        description: "Provides financial news, data, and analysis, including stock market updates, investment tips, and tools for tracking your portfolio.",
        link: "https://finance.yahoo.com"
    },
    {
        title: "Bankrate",
        description: "Specializes in personal finance, providing advice on mortgages, loans, credit cards, and saving strategies.",
        link: "https://www.bankrate.com"
    },
    {
        title: "Kiplinger",
        description: "Delivers personal finance advice, business forecasts, and investment insights to help you manage your money and grow your wealth.",
        link: "https://www.kiplinger.com"
    }
];

const Resources = () => {
    // hooks
    const { isLoggedIn, user } = useAuth();
    let navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn)
            navigate("/");
    }, [isLoggedIn]);

    return (
        <div className="resources-page bg-gray-100 dark:bg-gray-900 p-6">
            <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">Resources</h1>
            <div className="w-full max-w-4xl bg-white justify-center space-y-4">
                {resources.map((resource, index) => (
                    <div key={index} className="resource-item bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{resource.title}</h2>
                        <p className="text-gray-700 dark:text-gray-300">{resource.description}</p>
                        <a href={resource.link} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500" target="_blank" rel="noopener noreferrer">
                            Learn more
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;