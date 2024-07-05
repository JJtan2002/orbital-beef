import React from "react";
import useAxiosPrivate from "./useAxiosPrivate";
import { toast } from "react-toastify";

export function useProfile() {
    const axiosPrivate = useAxiosPrivate();

    /**
     * Get Profile Information
     */
    async function getProfile () {
        try {
            const response = await axiosPrivate.get('/users/setProfile/');
            const data = response.data;
            toast.success(data.message);
        } catch (err) {
            toast.error(err);
        }
    }


    /**
     * Edit Profile Information
     */
    async function editProfile () {
        try {
            const response = await axiosPrivate.put('/users/setProfile/');
            const data = response.data;
            toast.success(data.message);
        } catch (err) {
            toast.error(err);
        }
    }


    return { getProfile, editProfile };
}