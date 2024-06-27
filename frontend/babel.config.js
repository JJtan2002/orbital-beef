module.exports = {
    presets: [
        '@babel/preset-env',  // Transpile modern JavaScript syntax
        ["@babel/preset-react", {
            "runtime": "automatic"
        }]// Transpile JSX syntax
    ],
};