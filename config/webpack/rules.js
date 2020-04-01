const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const Config = require('../config').default;

module.exports = [
    {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
            loader: 'babel-loader'
        }
    },
    {
        test: /\.(sa|sc|c)ss$/,
        use: [
            Config.isDev ? 'style-loader' : MiniCssExtractPlugin.loader,
            'css-loader',
            {
                loader: 'sass-loader',
                options: {
                    data: `$env: ${process.env.NODE_ENV};`
                }
            }
        ]
    },
    {
        test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        loader: 'file-loader'
    },
    {
        test: /\.(woff|woff2)$/,
        exclude: /node_modules/,
        loader: 'url-loader?prefix=font/&limit=5000'
    },
    {
        test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
        exclude: /node_modules/,
        loader: 'url-loader?limit=10000&mimetype=application/octet-stream'
    },
    {
        test: /\.(jpe?g|png|gif|svg)$/i,
        use: ['url-loader?limit=10000', 'img-loader']
    }
];
