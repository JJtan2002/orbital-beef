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
            let endpoint = `budget_tracking/transactions?limit=${limit}&chart_type=${chartType}`;
            if (startDate)
                endpoint += `&start_date=${startDate.toISOString().split("T")[0]}`;
            if (endDate)
                endpoint += `&end_date=${endDate.toISOString().split("T")[0]}`;
            const response = await axiosPrivate.get(endpoint);

            if (chartType === 2) {
                return response.data;
            }
            return response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async function createTransaction({
        transaction,
    }) {
        try {
            // console.log("createTransaction: " + transaction.title);
            const newTransaction = {
                ...transaction,
                // date: transaction.date,
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
            const response = await axiosPrivate.delete(
                `/transaction/${transactionId}`
            );
            return await response.data;
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    return { getTransactions, createTransaction, deleteTransaction };
}