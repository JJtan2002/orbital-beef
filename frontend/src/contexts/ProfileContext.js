import React, { createContext, useContext, useEffect, useState } from 'react';
import { useProfile } from '../hooks/useProfile';
import { useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import { useAuth } from './AuthContext';
import useAxiosPrivate from '../hooks/useAxiosPrivate';

// create context
const ProfileContext = createContext();

// create context provider
const ProfileContextProvider = ({ children }) => {
    const { getProfile, editProfile } = useProfile();
    const { isLoggedIn } = useAuth();
    const axiosPrivate = useAxiosPrivate();

    const [theme, setTheme] = useState("");
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

    // update profile_picture field
    const updateAvatar = async (formData) => {
        try {
            const res = await axiosPrivate.put('/users/profile/?updateField=4', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            });
            await refetchProfile();
            console.log(profile);
        } catch (err) {
            console.log(err);
        }
    }


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
        setTheme(profile?.theme);
        setThemeType(profile?.theme);
        setFontSize(profile?.font_size);
    }, [profile]);

    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add('dark');
        } else {
            document.documentElement.classList.remove('dark');
        }
    }, [theme]);

    const updateDisplay = async (ev) => {
        const updateData = {
            theme: ev.target.theme.value,
            // fontsize: ev.target.fontsize.value,
        }

        try {
            await editProfile(
                3,
                updateData,
            );
            refetchProfile();
            toast.success("updateDisplay!");
        } catch (err) {
            toast.error("Some error occurred!");
        }

    };



    return (
        <ProfileContext.Provider value={{
            profile,
            refetchProfile, updateName, updatePassword, updateDisplay, updateAvatar,
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