/**
 * @description 语言翻译工具
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */
import { each, get, isString, isEmpty, replace, call } from './helper';

import { locale } from '../config';

import zhCN from '../resources/lang/zh-CN';

// 语言包映射
const languages = {
    'zh-CN': zhCN
};

// 当前语言包
const lang = languages[locale] || languages['zh-CN'];

// 已解析的单复数规则
const parsedRules = {};

/**
 * 翻译字符串
 * @param {string} message 消息
 * @param {Object} replaces 要替换的数据
 * @returns {string}
 */
function baseTrans(message, replaces = {}) {

    let newMessage = message;

    each(replaces, (value, key) => {

        newMessage = replace(newMessage, `:${key}`, value);

    });

    return message;

}


/**
 * 单复数选择
 *
 * @example choice('one apple|:number apples')
 * @example choice('one apple|2: two apples')
 * @example choice('one apple|2,5: two-five apples')
 * @example choice('one apple|2,5: two-five apples|:number apples')
 * @param {string} message 模板
 * @param {number=} number 实际数值
 * @returns {string}
 */
function choice(message = '', number = 0) {

    const messages = (message || '').split('|');

    for (let i = 0; i < messages.length; i++) {

        const part = messages[i].trim();

        let rule = parsedRules[part];

        if (!rule) {

            const matches = /^(\[([0-9,]+)\]:)?(.*?)$/.exec(part);

            rule = {
                min: null,
                max: null,
                message: matches[3]
            };
            // 设置了范围限制
            if (matches[2]) {

                // 用逗号分隔
                const ranges = matches[2].split(',');

                const min = parseInt(ranges[0], 10);

                rule.min = isNaN(min) ? null : min;

                // 没有逗号,则认为只min和max一样
                const max = ranges.length > 1 ? parseInt(ranges[1], 10) : rule.min;

                rule.max = isNaN(max) ? null : max;

            }

            // 缓存起来
            parsedRules[part] = rule;

        }

        if (isEmpty(rule.min) || rule.min < number || isEmpty(rule.max) || rule.max > number) {

            // 然后翻译
            return baseTrans(rule.message, { number });

        }

    }

    return message;

}

/**
 * 自定义翻译函数
 * @param {string} id 语言ID
 * @param {function(string,Object|number):string} translation 自定义翻译函数
 * @param {Object|number=} replaces 要替换的数据
 * @returns {string}
 */
export const transWith = (id, translation, replaces) => {

    const message = get(lang, id);

    if (isString(message)) {

        return call(translation, lang, message, replaces) || id;

    }

    return id;

};

/**
 * 单复数选择
 * @param {string} id 语言ID
 * @param {number=} number 数值
 * @returns {string}
 */
export const choiceTrans = (id, number) => transWith(id, choice, number);

/**
 * 翻译
 * @param {string} id 语言ID
 * @param {Object=} replaces 要替换的数据
 * @param {function(string,Object|number):string} translation 自定义翻译函数
 * @returns {string}
 */
export const trans = (id, replaces, translation = baseTrans) => transWith(id, translation, replaces);

export default trans;
