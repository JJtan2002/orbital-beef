import React, { createContext, useState, useEffect, useContext } from 'react';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import { useTransactions } from '../hooks/useTransactions';
import { useWallet } from "../hooks/useWallet";
import { useLabels } from "../hooks/useLabels";
import { useQuery } from "@tanstack/react-query";
import dayjs from "dayjs";
import 'chart.js/auto';

// create context
const DashboardContext = createContext();

// create context provider
const DashboardContextProvider = ({ children }) => {
    const [dateValue, setDateValue] = useState(() => {
        // Initialize with today's date
        return new Date().toLocaleString('en-CA', { timeZone: 'Asia/Singapore' }).split(',')[0];
    });
    const handleDateChange = (event) => {
        setDateValue(event.target.value);
    };
    const [dateForDisplay, setDates] = useState({ today: '', fiveDaysAgo: '', tenDaysAgo: '' });


    // hooks
    const { isLoggedIn, user } = useAuth();
    const { getTransactions, createTransaction, deleteTransaction } = useTransactions();
    const { getWallet } = useWallet();
    const { getLabels } = useLabels();
    const [expenseCategories, setExpenseCategories] = useState([]);
    const [incomeCategories, setIncomeCategories] = useState([]);
    const [pieDays, setPieDays] = useState(5);
    const [barDays, setBarDays] = useState(5);

    useEffect(() => {
        // Get today's date
        const today = new Date();
        // Get the date 5 days ago
        const fiveDaysAgo = new Date(today);
        const tenDaysAgo = new Date(today);
        fiveDaysAgo.setDate(today.getDate() - 5);
        tenDaysAgo.setDate(today.getDate() - 10);

        // Update state with formatted dates
        setDates({ today: today, fiveDaysAgo: fiveDaysAgo, tenDaysAgo: tenDaysAgo });
    }, []);

    const {
        refetch: refetchWallet,
        data: wallet,
        isPending,
        isError,
    } = useQuery({
        queryKey: ["api/wallet"],
        queryFn: () => getWallet(),
    });

    const {
        refetch: refetchExpenses,
        data: expenses,
        loading,
        error,
    } = useQuery({
        queryKey: ["api/transactions"],
        queryFn: () => getTransactions(5, 0),
    })

    const {
        refetch: refetchLabels,
        data: labels,
        isPendingLabels,
        isErrorLabels,
    } = useQuery({
        queryKey: ["api/label"],
        queryFn: () => getLabels(),
    });

    
    const {
        refetch: refetchBardata,
        data: bardata,
        isPendingBardata,
        isErrorBardata,
    } = useQuery({
        queryKey: ["api/bardata", barDays],
        queryFn: () => {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - barDays + 1);
            return getTransactions(
            /*limit:*/ 0,
            /*charType:*/ 1,
                startDate,
                endDate,
            );
        },
        enabled: !!barDays,
    });


    const {
        refetch: refetchPiedata,
        data: piedata,
        isPendingPiedata,
        isErrorPiedata,
    } = useQuery({
        queryKey: ["api/piedata", pieDays],
        queryFn: () => {
            const endDate = new Date();
            const startDate = new Date();
            startDate.setDate(endDate.getDate() - pieDays);
            return getTransactions(
            /*limit:*/ 0,
            /*charType:*/ 2,
                startDate,
                endDate,
            );
        },
        enabled: !!pieDays,
    })


    var barData = {
        labels: ['Loading'],
        datasets: [
            {
                label: 'Daily Expenses',
                data: [0],
                backgroundColor: 'rgba(75, 192, 192, 0.6)',
                borderColor: 'rgba(75, 192, 192, 1)',
                borderWidth: 1,
            },
        ],
    };

    if (!isErrorBardata && !isPendingBardata && bardata) {
        const sortbardata = bardata.sort((a, b) => new Date(a.date) - new Date(b.date));
        barData = {
            labels: sortbardata.map((day) => day.date),
            // labels: ['2024-06-15', '2024-06-16', '2024-06-17', '2024-06-18', '2024-06-19', '2024-06-20'],
            datasets: [
                {
                    label: 'Daily Expenses',
                    // data: [50, 100, 75, 125, 150, 200, 175],
                    data: sortbardata.map(day => day.value),
                    backgroundColor: 'rgba(75, 192, 192, 0.6)',
                    borderColor: 'rgba(75, 192, 192, 1)',
                    borderWidth: 1,
                },
            ],
        };
    }

    var pieData = {
        labels: ['Rent', 'Groceries', 'Utilities', 'Entertainment', 'Transport', 'Others'],
        datasets: [
            {
                data: [500, 300, 200, 100, 150, 50],
                backgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
                hoverBackgroundColor: [
                    '#FF6384',
                    '#36A2EB',
                    '#FFCE56',
                    '#4BC0C0',
                    '#9966FF',
                    '#FF9F40',
                ],
            },
        ],
    };

    if (!isErrorPiedata && !isPendingPiedata && piedata) {
        pieData = {
            labels: piedata.map(cate => cate.label_name),
            datasets: [
                {
                    data: piedata.map(cate => cate.value),
                    backgroundColor: piedata.map(cate => cate.label_color),
                    hoverBackgroundColor: piedata.map(cate => cate.label_color),
                },
            ],
        };
    }

    useEffect(() => {
        const fetchLabels = async () => {
            if (!isPendingLabels && !isErrorLabels && labels) {
                setExpenseCategories(labels.filter(label => label.is_expense).map((i) => [i["id"], i["name"]]));
                setIncomeCategories(labels.filter(label => !label.is_expense).map((i) => [i["id"], i["name"]]));
            }
        };

        fetchLabels();
    }, [labels, isPendingLabels, isErrorLabels]);

    const [transactionType, setTransactionType] = useState("Expense"); // State to track transaction type

    const handleTransaction = async (ev) => {
        ev.preventDefault();
        const date = new Date(ev.target.date.value);

        const formData = {
            title: ev.target.title.value,
            label: {
                id: ev.target.label.value,
            },
            value: parseInt(ev.target.amount.value),
            type: ev.target.type.value,
            date: dayjs(date).format("YYYY-MM-DD"),
        };

        await createTransaction({ transaction: formData });
        await refetchWallet();
        await refetchExpenses();
        await refetchBardata();
        await refetchPiedata();
        toast.success("Transaction added!");
    }

    const handleDeleteTransaction = async (transactionId) => {
        await deleteTransaction(transactionId);
        await refetchWallet();
        await refetchExpenses();
        await refetchBardata();
        await refetchPiedata();
        toast.warning("Transaction deleted!");
    };

    return (
        <DashboardContext.Provider value={{
            transactionType, expenseCategories, incomeCategories, dateValue,
            barData, pieData, pieDays, setPieDays, barDays, setBarDays,
            loading, expenses, wallet, isPending,
            setTransactionType,
            handleTransaction, handleDeleteTransaction, handleDateChange,
        }}>
            {children}
        </DashboardContext.Provider>
    );
};

// create custom hook
const useDash = () => {
    return useContext(DashboardContext);
}

// export the hook
export { useDash, DashboardContextProvider };