import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import userIcon from "../../images/user.png";
import { useNavigate } from 'react-router-dom';
import { usePro } from '../../contexts/ProfileContext';
import { useRef } from 'react';
import { toast } from 'react-toastify';

const ProfileSection = () => {
    const { isLoggedIn, Logout, refresh, validatePassword } = useAuth();
    const { profile, updateName, updatePassword, updateAvatar } = usePro();

    let navigate = useNavigate();
    
    const nameRef = useRef();
    const passwordRef = useRef();

    useEffect(() => {
        if (!isLoggedIn)
    
            navigate("/");
    }, [isLoggedIn, navigate]);

    const updateUserName = async (ev) => {
        ev.preventDefault();
        const updateData = {
            name: ev.target.name.value,     
        };

        try {
            await updateName(updateData);
            await refresh();
            nameRef.current.reset();
        } catch (err) {
            console.log(err);
        }
    };

    const updateUserAvatar = async (ev) => {
        ev.preventDefault();
        const avatar = ev.target.avatar.value;
        await updateAvatar(avatar);
    }

    const updateUserPassword = async (ev) => {
        ev.preventDefault();
        const updateData = {
            confirmPassword: ev.target.confirmPassword.value,
            resetPassword: ev.target.resetPassword.value,
        };

        if (!validatePassword(updateData.resetPassword)) {
            toast.error("Password should be at least 4 characters long");
            return;
        }

        try {
            const res = await updatePassword(updateData);
            if (res.success) {
                Logout();
                toast.success(res.success);
                toast.info("Please login with the new password");
                navigate("/login");
            } else {
                toast.error(res.error);
                passwordRef.current.reset();
            }
        } catch (err) {
            toast.error(err);
        }
    };

    return (
        <div className="w-4/5 mx-auto mt-8 flex flex-col">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="text-center mb-4">
                <img src={userIcon} alt="Profile Icon" className="w-24 h-24 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h2>
            </div>


            <form className="w-full mb-8" onSubmit={updateUserAvatar}>
                <div className="grid gap-6 mb-6 grid-cols-1 mb-4 flex items-center justify-center">
                <div className='flex flex-col ml-5 mr-5'>
                        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="profile_picture">
                        Profile Picture        
                        </label>
                        <input
                                id='avatar'
                                type="file"
                                accept="image/*"
                                // onChange={handleImageChange}
                                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                                required
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Upload Profile Picture
                        </button>
                    </div>
                </div>
            </form>
            


            <form className="w-full mb-8" onSubmit={updateUserName} ref={nameRef}>
                <div className="grid gap-6 mb-6 grid-cols-2 mb-4 flex items-center justify-center">
                    <div className='flex flex-col ml-5 mr-5'>
                        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="name">
                        Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                            placeholder={profile?.name}
                            required
                            //   onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col ml-5 mr-5'>
                        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="email">
                        Email
                        </label>
                        <div
                            id="email"
                            className="bg-gray-50 rounded-lg block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                        >
                            {profile?.email}
                        </div>
                    </div>
                </div>
                    
                
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    Update UserName
                    </button>
                </div>
            </form>

            <form onSubmit={updateUserPassword} ref={passwordRef}>
                <div className="grid gap-6 mb-6 grid-cols-2 mb-4 flex items-center justify-center">
                    <div className='flex flex-col ml-5 mr-5'>
                        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="confirmPassword">
                        Confirm Current Password
                        </label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name='confirmPassword'
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                            placeholder='password-placeholder'
                            required
                        />
                    </div>
                    <div className='flex flex-col ml-5 mr-5'>
                        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="resetPassword">
                        New Password
                        </label>
                        <input
                            type="password"
                            id="resetPassword"
                            name='resetPassword'
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                            placeholder='password-placeholder'
                            required
                        />
                    </div>
                </div>

                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    Reset Password
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default ProfileSection;
