import React from "react";
import { useAuth } from "../../contexts/AuthContext";
import UserIcon from "../../images/user.png"
import { usePro } from "../../contexts/ProfileContext";


const ProfileCard = () => {
    const { isLoggedIn } = useAuth();
    const { profile, isPendingProfile } = usePro();
    
    return isLoggedIn && !isPendingProfile && profile && (
        <div className="w-full md:w-1/3 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-600">
            <div className="flex flex-col items-center p-10">
                <img alt="User Icon" width="96" height="96" src={profile?.profile_picture} className="mb-6 rounded-full shadow-lg" />
                <h5 className="mb-3 text-xl font-medium text-gray-900 dark:text-white">{profile.name}</h5>
                <span className="text-sm text-gray-500 dark:text-gray-400">{profile.email}</span>
                {/* <div className="mt-4 flex space-x-3 lg:mt-6">
                    <a href="#"
                        className="inline-flex items-center rounded-lg bg-purple-700 px-4 py-2 text-center text-sm font-medium text-white hover:bg-purple-800 focus:outline-none focus:ring-4 focus:ring-purple-300 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-800">
                        Add friend
                    </a>
                    <a href="#"
                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white px-4 py-2 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-gray-700">
                        Message
                    </a>
                </div> */}
            </div>
        </div>
    )

};

export default ProfileCard;