require('@babel/register');
const webpackMerge = require('webpack-merge');
const common = require('./config/webpack/webpack.common.babel');

const buildEnv = process.env.NODE_ENV === 'production' ? 'prod' : 'dev';

const webpackConfig = require(`./config/webpack/webpack.${buildEnv}.babel`);
module.exports = webpackMerge(common, webpackConfig);
