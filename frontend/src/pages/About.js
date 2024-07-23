import React, { useRef } from "react";

const About = () => {
    const handleSubmit = () => {

    };

    const contentRef = useRef();

    const autoResize = () => {
        const textarea = contentRef.current;
        textarea.style.height = 'auto';
        textarea.style.height = textarea.scrollHeight + 'px';
    }

    const sections = [
        {
            title: "Our Mission",
            content: [
                "As students, managing finances can be overwhelming. Balancing tuition, rent, groceries, and leisure activities while trying to save can often lead to stress and confusion. ",
                "Our goal is to create an engaging, user-friendly money management app to help students. The app will enable users to budget, track expenses, set financial goals and learn about personal finance.",
                "We aim to empower students to take control of their finances, improve their financial literacy, and cultivate healthy financial habits.",
            ],
        },
        {
            title: "What We Offer",
            content: [
                "1. Create Account: the link in the Home page will take you to the register page.",
                "2. Log In: there is a Login page link in the Navigation Bar.",
                "3. Forget Password: find the link in Login Page.",
                "4. Reset Password: the link in the reset password email will take you to the page.",
                "5. Add Transaction Record: there is a add transaction card in the Dashboard page.",
                "6. 5/10/15/30-Day Expense Amount and Distribution Chart: check these charts are in the Dashboard page.",
                "7. Transaction List: you can either check 5 latest added transaction records in the Dashboard page, or check all the transaction records in the Transactions page.",
                "8. Add and Edit Expense Labels and Goals: you can approach these features in the Wallet page, where you can adjust the goal amount and color(to be displayed on pie chart), also decide whether it is a monthly goal or accumulative goal from the very beginning.",
                "9. Edit Balance: this feature can be found in Wallet page.",
                "10. Delete Transaction Records and Labels: there is a trash bin icon with each records, click it will do.",
                "11. Watchlist:",
                "12. Resource Page: you can access a list of links to finance education websites. We also offer a brief introduction to the websites as guidance for beginers.",
                "13. Update Settings: you can update your profile photo, account name, password and display theme in the setting page."
            ],
        },
        {
            title: "Our Story",
            content: [
                "This is our project for 2024 NUS Orbital.",
            ],
        },
        {
            title: "Our Team",
            content: [
                "Tan Jia Jun & Huang Yining",
            ],
        }
        // Add more sections as needed
    ];

    return (
        <div className="w-4/5 mx-auto mt-8 bg-white dark:bg-gray-800 dark:text-gray-100 min-h-screen flex flex-col">
        {sections.map((section, index) => (
            <div
            key={index}
            className="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-600"
            >
            <h2 className="text-2xl font-bold text-left mb-4 text-gray-900 dark:text-white">
                {section.title}
            </h2>
            {section.content.map((paragraph, idx) => (
                <p key={idx} className="text-left text-gray-700 dark:text-gray-400 mb-2">
                {paragraph}
                </p>
            ))}
            </div>
        ))}
            <div className="w-full  p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-600">
                <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white text-center">Feedback</h5>
                <form className="flex flex-col flex-col gap-4" onSubmit={handleSubmit}>
                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="subject" className="text-sm font-medium required">Subject</label>
                        </div>
                        <input id="subject" type="text" name="subject" placeholder="Enter your subject" required
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500"
                        />
                    </div>
                    <div>
                        <div className="mb-2 block">
                            <label htmlFor="content" className="text-sm font-medium required">Content</label>
                        </div>
                        <textarea 
                            id="content" 
                            type="text" 
                            name="content" 
                            placeholder="Enter your content" 
                            required
                            ref={contentRef}
                            rows={1}
                            style={{ overflow: 'hidden', resize: 'vertical' }}
                            onInput={autoResize}
                            class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-purple-500 focus:border-purple-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-purple-500 dark:focus:border-purple-500 resize:vertical overflow:hidden"
                        />
                    </div>
                    <div className="mt-2 block">
                        <button type="submit" class="w-full focus:outline-none hover:bg-purple-700 focus:ring-4 focus:ring-purple-300 font-bold rounded-lg text-sm px-5 py-2.5 dark:bg-purple-500 dark:hover:bg-purple-600 dark:focus:ring-purple-800"
                            style={{ backgroundColor: "#66cccc" }}
                        >
                            Submit
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default About;
