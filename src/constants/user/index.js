/**
 * @description 用户相关的枚举
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */
import { includes } from '../../utils/helper';

// 用户名不能包含的特殊符号列表
export const USER_NAME_SYMBOLS = ['#', '"', '\'', '(', ')', '/', '&', '$', '@'];

// TODO 先使用isUserName判断
export const USER_NAME_REG = /^\D$/;

// 用户手机号的正则表达式
export const USER_MOBILE_REG = /^1\d{10}$/;

// 用户邮箱的正则表达式
export const USER_EMAIL_REG = /\w[-\w.+]*@([A-Za-z0-9][-A-Za-z0-9]+\.)+[A-Za-z]{2,14}/;

// 用户名最小长度
export const USER_NAME_MIN_LENGTH = 3;
// 用户名最大长度
export const USER_NAME_MAX_LENGTH = 15;

// 密码最小长度
export const PASSWORD_MIN_LENGTH = 6;

// 管理员创建用户默认的角色ID
export const CREATE_USER_DEFAULT_ROLE = 5;

/**
 * 检测是否包含特殊符号
 * @param {string} name
 * @return {boolean}
 */
export const hasSymbols = (name) => {
    for (let i = 0; i < USER_NAME_SYMBOLS.length; i++) {
        if (includes(name, USER_NAME_SYMBOLS[i])) {
            return true;
        }
    }
    return false;
};

/**
 * 验证是否是邮箱格式
 * @param {string} email
 * @return {boolean}
 */
export const isEmail = email => USER_EMAIL_REG.test(email);

/**
 * 判断是否是手机号格式
 * @param {string} mobile
 * @return {boolean}
 */
export const isMobile = mobile => USER_MOBILE_REG.test(mobile);

/**
 * 判断是否是用户名格式
 * @param {string} name
 * @return {boolean}
 */
export const isUserName = name => (
    name.length >= USER_NAME_MIN_LENGTH
    && name.length <= USER_NAME_MAX_LENGTH
    && USER_NAME_REG.test(name) && !hasSymbols(name)
);

