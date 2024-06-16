import useAxiosPrivate from ".useAxiosPrivate";

export function useLabels() {
    const axiosPrivate = useAxiosPrivate();

    async function getLabels() {
        try {
            const endpoint = "/labels/";
            const response = await axiosPrivate.get(endpoint);
            const data = response.data;
            return data;
        } catch (error) {
            console.log(error);
            throw error;
        }
    }

    async function createLabel({
        label,
    }) {
        try {
            const response = await axiosPrivate.post("/label/", label);
            if (response.status !== 200) return null;
            return await response.data;
        } catch (error) {
            console.log(error);
        }

        return null;
    }

    async function deleteLabel(
        label_pk
    ) {
        try {
            const response = await axiosPrivate.delete(`/label/${label_pk}`);
            return await response.data;
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    return { getLabels, createLabel, deleteLabel };
}