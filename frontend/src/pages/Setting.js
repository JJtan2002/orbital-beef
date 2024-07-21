import React from "react";
import ProfileSetting from "../components/setting/ProfileSetting";
import DisplaySetting from "../components/setting/DisplaySetting";

const Setting = () => {
    return (
        <div className="bg-white dark:bg-gray-800 p-6">
            <div className="flex flex-col items-center justify-center mt-5">
                <ProfileSetting
                />
            </div>
            <div className="flex flex-col items-center justify-center mt-5">
                <DisplaySetting
                />
            </div>
        </div>
    );
};

export default  Setting;