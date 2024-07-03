import React, { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import userIcon from "../../images/user.png";
import { toast } from 'react-toastify';
import { useProfile } from '../../hooks/useProfile';
import { useNavigate } from 'react-router-dom';

const ProfileSection = () => {
    const { getProfile, editProfile } = useProfile();
    const { isLoggedIn } = useAuth();

    let navigate = useNavigate();

    useEffect(() => {
        if (!isLoggedIn)
            navigate("/");
    }, [isLoggedIn, navigate]);


    useEffect(() => {
        try {
            getProfile();
            editProfile();
        } catch (err) {
            toast.error(err);
        }
    }, []);

    return (
        <div className="w-4/5 mx-auto mt-8 flex flex-col">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <div className="text-center mb-4">
                <img src={userIcon} alt="Profile Icon" className="w-24 h-24 mx-auto mb-4" />
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Profile</h2>
            </div>
            <form>
                <div class="grid gap-6 mb-6 md:grid-cols-2" className="mb-4 flex flex-row items-center justify-center">
                    <div className='flex flex-col ml-5 mr-5'>
                        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="name">
                        Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                            placeholder={"name-placeholder"}
                            //   onChange={(e) => setName(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col ml-5 mr-5'>
                        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="email">
                        Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                            placeholder={"email-placeholder"}
                            //   onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                    <div className='flex flex-col ml-5 mr-5'>
                        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="password">
                        Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name='password'
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                            placeholder='password-placeholder'
                            // value={"email-placeholder"}
                            //   onChange={(e) => setEmail(e.target.value)}
                        />
                    </div>
                </div>
                    
                
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    Update Profile
                    </button>
                </div>
            </form>
        </div>
        </div>
    );
};

export default ProfileSection;
