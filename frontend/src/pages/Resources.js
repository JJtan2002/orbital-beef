import React from 'react';

const resources = [
    {
        title: "Resource 1",
        description: "Description for resource 1.",
        link: "https://example.com/resource1"
    },
    {
        title: "Resource 2",
        description: "Description for resource 2.",
        link: "https://example.com/resource2"
    },
    // Add more resources as needed
];

const Resources = () => {
    return (
        <div className="resources-page bg-gray-100 dark:bg-gray-900 p-6">
            <h1 className="text-2xl font-medium text-gray-900 dark:text-white mb-6">Resources</h1>
            <div className="w-full max-w-4xl bg-white justify-center space-y-4">
                {resources.map((resource, index) => (
                    <div key={index} className="resource-item bg-white dark:bg-gray-800 p-4 border border-gray-200 dark:border-gray-700 rounded-lg shadow">
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">{resource.title}</h2>
                        <p className="text-gray-700 dark:text-gray-300">{resource.description}</p>
                        <a href={resource.link} className="text-blue-500 hover:text-blue-600 dark:text-blue-400 dark:hover:text-blue-500" target="_blank" rel="noopener noreferrer">
                            Learn more
                        </a>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Resources;