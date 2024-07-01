import React from "react";

const About = () => {
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
                "6. 6-Day Expense Amount and Distribution Chart: check these charts are in the Dashboard page.",
                "7. Transaction List: you can either check 5 latest added transaction records in the Dashboard page, or check all the transaction records in the Transactions page.",
                "8. Add and Edit Expense Labels and Goals: you can approach these features in the Wallet page, where you can adjust the goal amount and color(to be displayed on pie chart), also decide whether it is a monthly goal or accumulative goal from the very beginning.",
                "9. Edit Balance: this feature can be found in Wallet page.",
                "10. Delete Transaction Records and Labels: there is a trash bin icon with each records, click it will do."
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
        <div className="w-4/5 mx-auto mt-8">
        {sections.map((section, index) => (
            <div
            key={index}
            className="mb-6 p-6 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
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
        </div>
    );
};

export default About;
