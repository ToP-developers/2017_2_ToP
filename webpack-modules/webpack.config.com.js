const path = require('path');
const ExtractTextPlugin = require('extract-text-webpack-plugin');

const extractSass = new ExtractTextPlugin({
    filename: '[name].css'
});

module.exports = {
    entry: {
        main: [
            'babel-polyfill',
            './src/static/css/main.scss',
            './src/index.ts'
        ]
    },

    output: {
        filename: '[name].js',
        path: path.join(__dirname, '..', 'src/built')
    },

    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },

    module: {
        rules: [
            {
                test: /\.tsx?$/,
                use: ['babel-loader', 'ts-loader'],
                exclude: /node_modules/
            },
            {
                enforce: 'pre',
                test: /\.js$/,
                use: ['babel-loader'],
                exclude: /node_modules/
            },
            {
                test: /\.xml/,
                loader: 'tp-fest-loader'
            },
            {
                test: /\.scss$/,
                use: extractSass.extract({
                    use: [{
                        loader: 'css-loader'
                    }, {
                        loader: 'sass-loader'
                    }],
                    // use style-loader in development
                    fallback: 'style-loader'
                })
            },
            {
                test: /\.(png|jpg|gid|svg)$/,
                use: [
                    'file-loader'
                ]
            }
        ]
    },
    plugins: [
        extractSass
    ]
};