module.exports = {
    presets: [
        '@babel/preset-env', // Transpile ES6+ syntax
        ['@babel/preset-react', { runtime: 'automatic' }], // Enable JSX support
    ],
};

