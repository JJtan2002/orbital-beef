import useAxiosPrivate from "./useAxiosPrivate";

export function useTransactions() {
    const axiosPrivate = useAxiosPrivate();

    async function getTransactions(
        limit = 0,
        chartType = 0,
        startDate,
        endDate,
    ) {
        try {
            let endpoint = `/budget_tracking/transactions/?limit=${limit}&chart_type=${chartType}`;
            if (startDate)
                endpoint += `&start_date=${startDate.toLocaleString('en-CA', { timeZone: 'Asia/Singapore' }).split(',')[0]}`;
            if (endDate)
                endpoint += `&end_date=${endDate.toLocaleString('en-CA', { timeZone: 'Asia/Singapore' }).split(',')[0]}`;
            const response = await axiosPrivate.get(endpoint);
            const data = await response.data;
            if (chartType === 2) {
                return data;
            }
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }

    }

    async function createTransaction({
        transaction,
    }) {
        try {
            const newTransaction = {
                ...transaction,
            };
            console.log(transaction);
            console.log(newTransaction);
            const response = await axiosPrivate.post("/budget_tracking/transaction/", newTransaction);
            if (response.status !== 200) return null;
            return await response.data;
        } catch (error) {
            console.log(error);
        }

        return null;
    }

    async function deleteTransaction({
        transactionId,
    }) {
        try {
            console.log(transactionId);
            const response = await axiosPrivate.delete(
                `/budget_tracking/transaction/${transactionId}`
            );
            return await response.data;
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    return { getTransactions, createTransaction, deleteTransaction };
}