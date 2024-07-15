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
            const response = await axiosPrivate.get('/users/profile/');
            const data = response.data;
            console.log(data);
            return data;
        } catch (err) {
            toast.error(err);
        }
    }


    /**
     * Edit Profile Information
     * updateField=1 --> change name
     * updateField=2 --> comfirm old password and change to new password
     * updateField=3 --> update display settings
     */
    async function editProfile (
        updateField=0,
        updateData,
    ) {
        try {
            let endpoint =  `/users/profile/?updateField=${updateField}`;
            // edit endpoint according to the type
            if (updateField === 1) {
                endpoint += `&name=${updateData.name}`;
            }
            if (updateField === 2) {
                if (updateData.confirmPassword === updateData.resetPassword) {
                    toast.warning("Please enter a different password!");
                    return;
                }
                endpoint += `&confirmPassword=${updateData.confirmPassword}&resetPassword=${updateData.resetPassword}`;
            }
            if (updateField === 3) {
                endpoint += `&theme=${updateData.theme}&fontsize=${updateData.fontsize}`;
            }
            const response = await axiosPrivate.put(endpoint);
            const data = response.data;
            console.log(data.message);
            return data;
        } catch (err) {
            toast.error(err);
        }
    }


    return { getProfile, editProfile };
}