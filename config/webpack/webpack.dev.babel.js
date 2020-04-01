import webpack from 'webpack';
import Jarvis from 'webpack-jarvis';
import envVars from '@config/development.env';
import paths from './paths';

module.exports = {
    mode: 'development',
    output: {
        filename: '[name].js',
        path: paths.outputPath,
        chunkFilename: '[name].js'
    },
    performance: {
        hints: false, // 'warning',
        maxAssetSize: 450000,
        maxEntrypointSize: 8500000,
        assetFilter: assetFilename => {
            return assetFilename.endsWith('.css') || assetFilename.endsWith('.js');
        }
    },
    devServer: {
        contentBase: paths.outputPath,
        compress: true,
        hot: true,
        historyApiFallback: true
    },
    plugins: [
        new webpack.HotModuleReplacementPlugin(),
        new webpack.DefinePlugin({
            ...envVars
        }),
        new Jarvis({
            port: 1338
        })
    ]
};
