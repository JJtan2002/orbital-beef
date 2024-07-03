import React from "react";
import ProfileSetting from "../components/setting/ProfileSetting";

const Setting = () => {
    return (
        <>
        <div>This is Setting page!</div>
        <div className="flex items-center justify-center mt-5">
            <ProfileSetting
            />
        </div>
        </>
    );
};

export default  Setting;