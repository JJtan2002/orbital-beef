import useAxiosPrivate from "./useAxiosPrivate";

export function useWatchlist() {
    const axiosPrivate = useAxiosPrivate();

    async function getWatchlist() {
        try {
            const endpoint = "/watchlist/";
            const response = await axiosPrivate.get(endpoint);
            const data = response.data;
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    return { getWatchlist };
}