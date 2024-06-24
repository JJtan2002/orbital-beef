import useAxiosPrivate from "./useAxiosPrivate";

export function useLabels() {
    const axiosPrivate = useAxiosPrivate();

    async function getLabels() {
        try {
            const endpoint = "/budget_tracking/labels/";
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
            const response = await axiosPrivate.post("/budget_tracking/labels/", label);
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
            const response = await axiosPrivate.delete(`/budget_tracking/labels/${label_pk}`);
            return await response.data;
        } catch (error) {
            console.log(error);
        }
        return null;
    }

    async function editLabel({
        label,
        label_pk,
    }) {
        try {
            const response = await axiosPrivate.put(`/budget_tracking/labels/${label_pk}`, label);
            if (response.status !== 200) return null;
            return await response.data;
        } catch (error) {
            console.log(error);
        }

        return null;
    }

    return { getLabels, createLabel, deleteLabel, editLabel };
}