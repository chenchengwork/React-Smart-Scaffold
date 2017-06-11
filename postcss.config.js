/**
 * @description postcss配置
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

const autoprefixer = require('autoprefixer');

/*
 https://github.com/ai/browserslist#queries

 ● last 2 versions: 主流浏览器的最新两个版本
 ● last 1 Chrome versions: 谷歌浏览器的最新版本
 ● last 2 Explorer versions: IE的最新两个版本
 ● last 3 Safari versions: 苹果浏览器最新三个版本
 ● Firefox >= 20: 火狐浏览器的版本大于或等于20
 ● iOS 7: IOS7版本
 ● Firefox ESR: 最新ESR版本的火狐
 ● > 5%: 全球统计有超过5%的使用率
 */
module.exports = {
    plugins: [
        autoprefixer({
            browsers: [
                'last 5 versions',
                'last 3 Chrome versions',
                'last 2 Explorer versions',
                'last 3 Safari versions',
                'Firefox >= 20'
            ]
        })
    ]
};
