/**
 * @description webpack 打包配置
 */

const FormatWebpackConf = require('./FormatWebpackConf');
const { baseWebpackConf, formatStyleLoader, excludeRegex, routesComponentsRegex }= require('./webpack.config.base');

module.exports = new FormatWebpackConf(baseWebpackConf)
    // 懒加载代码分离
    .use(function(webpackConf){
        /*
            依赖说明：
                npm install bundle-loader --save-dev
         */

        /**
         * 页面入口文件,使用异步加载方式
         * @type {RegExp}
         */
        webpackConf.module.rules.unshift({
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
        });

    })
    // 支持antd 配置
    .use(function(webpackConf){
        console.log(111)
        /*
            依赖说明：
                npm install antd --save
                npm install less@2.7.2 less-loader babel-plugin-import --save-dev
         */

        /**
         * 自定义antd的样式
         * @type {{"@primary-color": string, "@font-size-base": string, "@body-background": string, "@layout-body-background": string}}
         */
        const customAntdStyle = {
            '@primary-color': '#108ee9',		            // 更改antd的主题颜色;
            // "@icon-url":"'/asserts/ant_font/iconfont'",  // 更改字体地址; 注意:必须再加额外的“'”,将icon字体部署到本地
            '@font-size-base': '12px',                      // 修改基础字体大小
            '@body-background': '#fff',                     // 修改body的背景颜色
            '@layout-body-background': '#fff',              // 修改layout布局的body背景颜色
        };

        webpackConf.module.rules.push({
            test: /\.less/,
            use: formatStyleLoader({
                loader: 'less-loader',
                options: {
                    sourceMap: true,
                    modifyVars: customAntdStyle
                }
            })
        });

        webpackConf.module.rules = webpackConf.module.rules.map(rule => {
            if (rule.loader === "babel-loader"){
                // `style: true` for less
                // babel-plugin-import
                rule.options.plugins.push(['import', {libraryName: 'antd', 'libraryDirectory': 'es', style: true}]);

                return rule;
            }

            return rule;
        })

    })
    .end();


