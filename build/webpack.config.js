/**
 * @description webpack 打包配置
 */

const webpack = require('webpack');
const CommonsChunkPlugin = webpack.optimize.CommonsChunkPlugin;   // 提取公共库的插件
const ExtractTextPlugin = require('extract-text-webpack-plugin');
const autoprefixer = require('autoprefixer');

// 页面入口文件,使用异步加载方式
const routesComponentsRegex = /src\/routes\/([\w-])+?\/((.*)\/)?routes\/((.*)\/)?index.js(x)?$/g;
// 编译排除的文件
const excludeRegex = /(node_modules|bower_modules)/;

// 自定义antd的样式
const customAntdStyle = {
    '@primary-color': '#108ee9',		            // 更改antd的主题颜色;
    // "@icon-url":"'/asserts/ant_font/iconfont'",  //更改字体地址; 注意:必须再加额外的“'”,将icon字体部署到本地
    '@font-size-base': '12px',                      // 修改基础字体大小
    '@body-background': '#fff',                     // 修改body的背景颜色
    '@layout-body-background': '#fff',              // 修改layout布局的body背景颜色
}

// 格式化不同的样式loader
const formatStyleLoader = (otherLoader = null) => {
    const baseLoaders = [
        {
            loader: 'css-loader',
            options: {
                sourceMap: true
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

    if(otherLoader) baseLoaders.push(otherLoader);

    return ExtractTextPlugin.extract(
        {
            fallback: 'style-loader',
            use: baseLoaders
        }
    )
};

module.exports = {
    // 用于生成源代码的mapping
    devtool: 'cheap-module-source-map',	// cheap-module-source-map,cheap-source-map

    entry: {
        app: ['./src/index'],
        // 提取公共包
        vendor: [
            'babel-polyfill',
            'url-search-params-polyfill',
            'lodash',
            'react',
            'react-dom',
            './src/utils/T'
        ]
    },

    // 指定模块目录名称
    resolve: {
        extensions: ['.js', '.jsx'],
        modules: ['node_modules', 'web_modules', './src']
    },

    output: {
        // 公网发布的目录
        publicPath: '/public/',
        // 编译的目录
        path: `${__dirname}/../public/`,
        filename: '[name].js'
    },

    module: {
        rules: [
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

            {
                test: /\.less/,
                use: formatStyleLoader({
                    loader: 'less-loader',
                    options: {
                        sourceMap: true,
                        modifyVars: customAntdStyle
                    }
                })
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
                            debug: true
                        }],
                        'react',
                        'stage-0'
                    ],
                    plugins: [
                        // babel-plugin-import
                        ['import', {libraryName: 'antd', 'libraryDirectory': 'es', style: true}], // `style: true` for less
                        ['transform-decorators-legacy', 'transform-decorators']	// 支持es7的装饰器
                    ]
                }
            }
        ]
    },

    plugins: [
        // 第一个参数vendor和entry中verdor名称对应，第二个参数是输出的文件名
        new CommonsChunkPlugin({name: 'vendor', filename: '[name].js'}),

        // 自动加载赋值模块
        new webpack.ProvidePlugin({
            $: 'jquery',
            jQuery: 'jquery',
            React: 'react'
        }),

        // 提取文本
        new ExtractTextPlugin({
            filename: 'vendor.css?[hash]-[chunkhash]-[contenthash]-[name]',
            disable: false,
            allChunks: true
        }),

        // 开发环境和生产环境配置
        new webpack.DefinePlugin({
            'process.env': {
                /* eslint eqeqeq: 0 */
                // 控制如react、react-dom等第三方包的warnning输出,设置为production将不输出warnning
                NODE_ENV: process.env.BUILD_DEV == 1 ? '"dev"' : '"production"'
            },
            // __DEV__是可在业务代码中使用变量，用于做些只在开发环境
            __DEV__: JSON.stringify(JSON.parse(process.env.BUILD_DEV))
        })
    ]
};
