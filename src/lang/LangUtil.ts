import React from 'react';
import { FormattedMessage, IntlShape, MessageDescriptor } from 'react-intl';
import { commonLangMsg } from './commonMsg';
import dateUtil from './dateUtil';
import EnumEnv from '@/constants/EnumEnv';
const { lang: currentLang  } = EnumEnv.intl;

export default class LangUtil {
    // react-intl对象
    intl: IntlShape = null;

    /**
     * 设置react-intl对象
     * @param intl
     * @return {*}
     */
    setIntl = (intl: IntlShape) => this.intl = intl;

    /**
     *
     */
    t = (messages: {[index: string]: MessageDescriptor}, key = "v", params = {}) => this.intl.formatMessage(messages[key], params);

    /**
     * 获取语言标识
     * @return {{language: string}}
     */
    getLang = () => ({language: currentLang});

    /**
     * 获取带有标签的公共信息
     * @return {*}
     */
    getCommonTagMsg = (key: string, params = {}) =>React.createElement(FormattedMessage, {...commonLangMsg[key], values: params});

    /**
     * 获取不带标签的公共信息
     * @param key
     * @param params
     * @return {*|string|React.ReactNodeArray}
     */
    getCommonMsg = (key: string, params = {}) => {
        return this.intl.formatMessage(commonLangMsg[key], params)
    };

    // 格式化时间戳
    // @ts-ignore
    dateFormat = (timestamp: number, format = "ymd_hms") => dateUtil[currentLang][format](timestamp);

}

