import React, { createContext, useState, useEffect, useContext, Children } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useQuery } from '@tanstack/react-query';

// create context
const ProfileContext = createContext();

// create context provider
const ProfileContextProvider = ({children}) => {
    const { getProfile } = useProfile();

    const {
        refetch: refetchProfile,
        data: profile,
        isPendingProfile,
        isErrorProfile,        
    } = useQuery({
        queryKey: ["api/profile"],
        queryFn: () => getProfile(),
    });


    return (
        <ProfileContext.Provider value = {{
            profile,
            refetchProfile,
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