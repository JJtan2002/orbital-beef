import useAxiosPrivate from "./useAxiosPrivate";

export function useWatchlist() {
    const axiosPrivate = useAxiosPrivate();

    async function getWatchlist() {
        try {
            const endpoint = "/watchlist/watchlist/";
            const response = await axiosPrivate.get(endpoint);
            const data = response.data;
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async function createWatchlist({ counter, }) {
        try {
            console.log({ counter });
            const endpoint = "/watchlist/watchlist/";
            const response = await axiosPrivate.post(endpoint, counter);
            return await response.data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async function deleteWatchlist(
        watchlist_pk
    ) {
        try {
            const response = await axiosPrivate.delete(`/watchlist/watchlist/${watchlist_pk}/`);
            return await response.data;
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    async function getStockData() {
        try {
            const endpoint = "/watchlist/stockdata/";
            const response = await axiosPrivate.get(endpoint);
            const data = response.data;
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return { getWatchlist, getStockData, deleteWatchlist, createWatchlist };
}