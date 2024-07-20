import React from "react";
import { usePro } from "../../contexts/ProfileContext";

const DisplaySetting = () => {
    const { profile, themeType, fontSize, setThemeType, setFontSize, updateDisplay } = usePro();
    const THEME_CHOICES = [
        ['light', 'Light'],
        ['dark', 'Dark'],
    ]

    const FONT_SIZE_CHOICES = [
        ['small', 'Small'],
        ['medium', 'Medium'],
        ['large', 'Large'],
    ]

    const updateUserDisplay = async (ev) => {
        ev.preventDefault();
        updateDisplay(ev);
    };

    return (
        <>
        <div className="w-4/5 mx-auto mt-8 flex flex-col">
        <div className="p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-600">
            <div className="text-center mb-4">
                <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Display</h2>
            </div>
            <form onSubmit={updateUserDisplay}>
                <div className="grid gap-6 mb-6 grid-cols-2 mb-4 flex items-center justify-center">
                    <div className='flex flex-col ml-5 mr-5'>
                        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="theme">
                        Theme
                        </label>
                        <select name="theme" id="theme" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" 
                            value={themeType}
                            onChange={(e) => setThemeType(e.target.value)}
                        >
                            {THEME_CHOICES.map((theme) => (
                                <option key={theme[0]} value={theme[0]}>{theme[1]}</option>
                            ))
                            }
                        </select>
                    </div>
                    <div className='flex flex-col ml-5 mr-5'>
                        <label className="block text-gray-700 dark:text-gray-200 text-sm font-bold mb-2" htmlFor="fontsize">
                        Font Size
                        </label>
                        <select name="fontsize" id="fontsize" className="w-full p-2 border border-gray-300 rounded dark:border-gray-600 dark:bg-gray-800 dark:text-white" 
                            value={fontSize}
                            onChange={(e) => setFontSize(e.target.value)}
                        >
                            {FONT_SIZE_CHOICES.map((size) => (
                                <option key={size[0]} value={size[0]}>{size[1]}</option>
                            ))
                            }
                        </select>
                    </div>
                </div>
                    
                
                <div className="flex items-center justify-center">
                    <button
                        type="submit"
                        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                    >
                    Update Display
                    </button>
                </div>
            </form>
        </div>
        </div>
        </>
    );
};

export default DisplaySetting;