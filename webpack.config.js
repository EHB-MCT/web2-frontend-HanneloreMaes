const path = require('path');

module.exports = {
    entry: ['./src/index.js', './src/savedInput.js'],
    output: {
        path: path.resolve(__dirname, 'docs'),
        filename: 'main.js'
    },
    mode: 'development'
}