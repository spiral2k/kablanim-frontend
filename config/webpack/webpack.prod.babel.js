import MiniCssExtractPlugin from 'mini-css-extract-plugin';

import paths from './paths';

module.exports = {
    mode: 'production',
    output: {
        filename: `${paths.jsFolder}/[name].bundle.js`,
        path: paths.outputPath,
        chunkFilename: `${paths.jsFolder}/[name].bundle.js`
    },
    plugins: [new MiniCssExtractPlugin({ filename: 'css/[name].css' })],
    devtool: 'source-map'
};
