import React, { createContext, useContext, useEffect, useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';

// create context
const ProfileContext = createContext();

// create context provider
const ProfileContextProvider = ({children}) => {
    const { getProfile, editProfile } = useProfile();
    const { isLoggedIn } = useAuth();

    const [themeType, setThemeType] = useState("");
    const [fontSize, setFontSize] = useState("");

    // refetch profile information
    const {
        refetch: refetchProfile,
        data: profile,
        isPendingProfile,
        isErrorProfile,        
    } = useQuery({
        queryKey: ["api/profile"],
        queryFn: () => getProfile(),
        enabled: false,
    });

    useEffect(() => {
        if (isLoggedIn) {
            refetchProfile();
        }
    }, [isLoggedIn, refetchProfile]);


    // update name field
    const updateName = async (updateData) => {
        try {
            await editProfile(
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
            return response;
        } catch (err) {
            toast.error(err);
        }
     }


    // TODO: update the displaysetting
    useEffect(() => {
        setThemeType(profile?.theme);
        setFontSize(profile?.font_size);
    }, [profile]);

    useEffect(() => {
        if (themeType === 'dark') {
            console.log("It's dark!");
            document.documentElement.classList.add('dark');
        } else {
            console.log("nothing");
            document.documentElement.classList.remove('dark');
        }
    }, [themeType]);

    const updateDisplay = async () => {
        const updateData = {
            theme: themeType,
            fontsize: fontSize,
        }

        try {
            await editProfile(
                3,
                updateData,
            );
            await refetchProfile();
            toast.success("updateDisplay!");
        } catch (err) {
            toast.error("Some error occurred!");
        }
        
    };



    return (
        <ProfileContext.Provider value = {{
            profile,
            refetchProfile, updateName, updatePassword, updateDisplay,
            themeType, fontSize,
            setThemeType, setFontSize,
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