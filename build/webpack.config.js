/**
 * @description webpack 打包配置
 */

const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;   //提取公共库的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');

// 页面入口文件,使用异步加载方式
const routesComponentsRegex = /src\/components\/([\w-])+?\/(((?!(components|templates)).)*\/)?index.jsx$/g;

// 编译排除的文件
const excludeRegex = /(node_modules|bower_modules)/;

module.exports = {

    // 用于生成源代码的mapping
    devtool: '#source-map',

    entry: {
        app: ['./src/index'],
        //提取公共包
        vendor: [
          'react',
          'react-dom',
        ]
    },

    // 指定模块目录名称
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules']
    },
    output: {
        // 公网发布的目录
        publicPath: '/public/',
        // 编译的目录
        path: `${__dirname}/../public/`,
        filename: '[name].js'
    },
    module: {
        loaders: [
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
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    }
                )
            },
            {
                test: /\.scss$/,
                exclude: excludeRegex,
                use: ExtractTextPlugin.extract(
                    {
                        fallback: 'style-loader',
                        use: [
                            {
                                loader: 'css-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'postcss-loader',
                                options: {
                                    sourceMap: true
                                }
                            },
                            {
                                loader: 'sass-loader',
                                options: {
                                    sourceMap: true
                                }
                            }
                        ]
                    }
                )
            },
            {
                test: routesComponentsRegex,
                exclude: excludeRegex,
                use: [
                    {
                        loader: 'bundle-loader',
                        options: {
                            lazy: true
                        }
                    }
                ]
            },
            {
                loader: 'babel-loader',
                exclude: [
                    excludeRegex,
                    routesComponentsRegex
                ],
                test: /\.jsx?$/,
                query: {
                    presets: [
                        'babel-polyfill',
                        'es2015',
                        'react',
                        'stage-0'
                    ]
                }
            }
        ]
    },
    plugins: [

        //第一个参数vendor和entry中verdor名称对应，第二个参数是输出的文件名称
        new CommonsChunkPlugin({name:'vendor', filename:'[name].js'}),

        //自动加载赋值模块
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            React:'react'
        }),

        //提取文本
        new ExtractTextPlugin({
            filename: 'vendor.css?[hash]-[chunkhash]-[contenthash]-[name]',
            disable: false,
            allChunks: true
        }),

        // 开发环境和生产环境配置
        new webpack.DefinePlugin({
            'process.env': {
                // 控制如react、react-dom等第三方包的warnning输出,设置为production将不输出warnning
                NODE_ENV: process.env.BUILD_DEV === '1' ? '"dev"' : '"production"'
            }
        })
    ]
};
