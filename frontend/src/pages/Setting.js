import React from "react";
import ProfileSetting from "../components/setting/ProfileSetting";
import DisplaySetting from "../components/setting/DisplaySetting";

const Setting = () => {
    return (
        <>
        <div className="flex flex-col items-center justify-center mt-5">
            <ProfileSetting
            />
        </div>
        <div className="flex flex-col items-center justify-center mt-5">
            <DisplaySetting
            />
        </div>
        </>
    );
};

export default  Setting;