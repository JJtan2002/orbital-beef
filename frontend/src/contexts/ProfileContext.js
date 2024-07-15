import React, { createContext, useState, useEffect, useContext, Children } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';

// create context
const ProfileContext = createContext();

// create context provider
const ProfileContextProvider = ({children}) => {
    const { getProfile, editProfile } = useProfile();

    // refetch profile information
    const {
        refetch: refetchProfile,
        data: profile,
        isPendingProfile,
        isErrorProfile,        
    } = useQuery({
        queryKey: ["api/profile"],
        queryFn: () => getProfile(),
    });


    // update name field
    const updateName = async (updateData) => {
        try {
            const response = await editProfile(
                1, 
                updateData,
            );
            await refetchProfile();
        } catch (err) {
            console.log(err);
        }
    };

    // TODO: resetPassword
    const updatePassword = async (updateData) => {
        try {
            const response = await editProfile(
                2,
                updateData,
            );
        } catch (err) {
            toast.error(err);
        }
     }


    // TODO: update the displaysetting

    return (
        <ProfileContext.Provider value = {{
            profile,
            refetchProfile, updateName, updatePassword,
            isPendingProfile,
        }}>
            {children}
        </ProfileContext.Provider>
    );
};

// create custom hook
const usePro = () => {
    return useContext(ProfileContext);
}

// export the hook
export { usePro, ProfileContextProvider };