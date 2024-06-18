import useAxiosPrivate from "./useAxiosPrivate";

export function useWallet() {
    const axiosPrivate = useAxiosPrivate();

    async function getWallet() {
        try {
            const response = await axiosPrivate.get("/budget_tracking/wallet/");
            const data = (await response.data);
            return data;
        } catch (error) {
            console.log(error);
            return {
                current_amount: 0,
                monthly_expenses: 0,
                monthly_incomes: 0,
            };
        }
    }

    async function updateWallet({ value }) {
        try {
            const response = await axiosPrivate.put("/budget_tracking/wallet/", value);
            const data = await response.data;
            return data;
        } catch (error) {
            return error.response.data;
        }
    }

    return { getWallet, updateWallet };
}