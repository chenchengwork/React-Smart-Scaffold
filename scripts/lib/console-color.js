/**
 * console 颜色包
 */


//console.log('\033[32m Compiled successfully in 19987ms\033[0m')
/**
 *
 * @type {{black: string, red: string, green: string, yellow: string, blue: string, purple: string, darkGreen: string, white: string}}
 */
const fontColor = {
    // close: "\033[0m",       //
    black: "\033[30m",
    red: "\033[31m",
    green: "\033[32m",
    yellow: "\033[33m",
    blue: "\033[34m",
    purple: "\033[35m",         // 紫色
    darkGreen: "\033[36m",      // 深绿色
    white: "\033[37m",
};

let colorFn = {};
Object.keys(fontColor).forEach(colorKey => {
    colorFn[colorKey] = (str) => console.log(`${fontColor[colorKey]}${str}` + '\033[0m')
});

/**
 * @type {{black: Function, red: Function, green: Function, yellow: Function, blue: Function, purple: Function, darkGreen: Function, white: Function}}
 */
module.exports = colorFn;
