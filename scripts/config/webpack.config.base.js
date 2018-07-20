/**
 * @description webpack 打包配置
 */

const webpack = require('webpack');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');
const autoprefixer = require('autoprefixer');
const paths = require('./paths');

/**
 * 页面入口文件,使用异步加载方式
 * @type {RegExp}
 */
const routesComponentsRegex = /src\/routes\/([\w-])+?\/((.*)\/)?routes\/((.*)\/)?index.js(x)?$/g;

/**
 * 编译排除的文件
 * @type {RegExp}
 */
const excludeRegex = /(node_modules|bower_modules)/;

/**
 * 格式化不同的样式loader
 * @param otherLoader
 * @return {*}
 */
const formatStyleLoader = (otherLoader = null) => {
    const baseLoaders = [
        {
            loader: 'css-loader',
            options: {
                sourceMap: true,
            }
        },
        {
            loader: 'postcss-loader',
            options: {
                sourceMap: true,
                ident: 'postcss', 	// https://webpack.js.org/guides/migrating/#complex-options
                plugins: () => [
                    require('postcss-flexbugs-fixes'),
                    autoprefixer({
                        browsers: [
                            '>1%',
                            'last 4 versions',
                            'Firefox ESR',
                            'not ie < 9' // React doesn't support IE8 anyway
                        ],
                        flexbox: 'no-2009'
                    })
                ]
            }
        }
    ];

    if(otherLoader) {
        // 针对scss进行css-module处理
        if(otherLoader.loader == 'sass-loader'){
            baseLoaders[0] = {
                loader: 'css-loader',
                options: {
                    sourceMap: true,
                    modules: true,
                    localIdentName: '[name]__[local]__[hash:base64:5]'
                }
            }
        }

        baseLoaders.push(otherLoader);
    }

	baseLoaders.unshift(MiniCssExtractPlugin.loader);

	return baseLoaders;
};

/**
 * 获取模型规则
 * @return {*[]}
 */
const getModuleRules = () => {
    // 处理静态资源规则
    const staticResourceRules = [
        {
            test: /\.(png|jpg|gif)$/,
            use: 'url-loader?limit=8192' //  <= 8kb的图片base64内联
        },
        {
            test: /\.woff(\?v=\d+\.\d+\.\d+)?$/,
            use: 'url-loader?limit=10000&minetype=application/font-woff'
        },
        {
            test: /\.woff2(\?v=\d+\.\d+\.\d+)?$/,
            use: 'url-loader?limit=10&minetype=application/font-woff'
        },
        {
            test: /\.ttf(\?v=\d+\.\d+\.\d+)?$/,
            use: 'url-loader?limit=10&minetype=application/octet-stream'
        },
        {
            test: /\.eot(\?v=\d+\.\d+\.\d+)?$/,
            use: 'file-loader'
        },
        {
            test: /\.(txt|doc|docx|swf)$/,
            use: 'file-loader?name=[path][name].[ext]'
        },
        {
            test: /\.svg(\?v=\d+\.\d+\.\d+)?$/,
            use: 'url-loader?limit=10&minetype=image/svg+xml'
        },
    ];

    // 处理css资源规则
    const cssRules = [
        {
            test: /\.css$/,
            use: formatStyleLoader()
        },
        {
            test: /\.scss/,
            exclude: excludeRegex,
            use: formatStyleLoader({
                loader: 'sass-loader',
                options: {
                    sourceMap: true
                }
            })
        },
    ];

    return [
        ...staticResourceRules,
        ...cssRules,

        // 添加babel转换解决js兼容性问题
        {
            loader: 'babel-loader',
            exclude: [
                excludeRegex,
                routesComponentsRegex
            ],
            test: /\.jsx?$/,
            options: {
                presets: [
                    'babel-polyfill',
                    ['env', {
                        // 根据browserslist来分析支持情况， 具体的配置参照： https://github.com/ai/browserslist
                        browsers: [
                            "last 2 versions",
                            "ie >= 8",
                        ],
                        modules: false,
                        useBuiltIns: true,
                        debug: process.env.NODE_ENV === "production" ? false :true
                    }],
                    'react',
                    'stage-0'
                ],
                plugins: [
                    ['transform-decorators-legacy', 'transform-decorators'],	// 支持es7的装饰器
                ],

            }
        },


    ]
};

/**
 * 获取插件
 * @returns {*[]}
 */
const getPlugins = () => ([
    // 提取css
    new MiniCssExtractPlugin({
        filename: "[name].css"
    }),

    // 自动加载赋值模块
    new webpack.ProvidePlugin({
        React: 'react'
    }),
]);

const baseWebpackConf = {
    // 用于生成源代码的mapping
    devtool: 'cheap-module-source-map',	// cheap-module-source-map,cheap-source-map

    mode: 'development',

    optimization: {
        // 代码分割策略配置
        splitChunks: {
            chunks: 'all',
            name: 'vendor',
            minSize: 30000,
            minChunks: 1,
            maxAsyncRequests: 5,
            maxInitialRequests: 3,
            cacheGroups: {
                // 合并多个css到一个css文件中
                styles: {
                    name: 'vendor',
                    test: /\.scss|css|less$/,
                    chunks: 'all',    // merge all the css chunk to one file
                    minChunks: 1,
                    reuseExistingChunk: true,
                    enforce: true
                }
            }
        },

        runtimeChunk: {
            name: 'runtime',
        }
    },

    entry: {
        app: [paths.app_IndexJs],
    },

    // 指定模块目录名称
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', 'web_modules', './src'],
        mainFields: ['browser', 'main', 'module'],      // 文件入口字段
    },

    output: {
        // 公网发布的目录
        publicPath: paths.webpackPublicPath,
        // 编译的目录
        path: paths.buildPath,
        filename: '[name].js'
    },

    module: {
        rules: getModuleRules()
    },

    plugins: getPlugins()
};




module.exports = {
    formatStyleLoader,
    routesComponentsRegex,
    excludeRegex,
    baseWebpackConf,
};
