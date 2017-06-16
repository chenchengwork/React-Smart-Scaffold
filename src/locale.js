/**
 * Created by chencheng on 16-7-12.
 */
import T from './utils/T'
import { addLocaleData } from 'react-intl'

/**
 * 获取国际化信息
 * @returns {{locale: string, messages: {}}}
 */
export function getLocale(){
    let messages = {},
        locale = 'zh',
        langType = 'zh-CN';

    let lang = T.cookies.get('tj_langKey');
    if(lang){
        langType = lang == 'zh' ? 'zh-CN' : 'en';
    }

    switch (langType){
        case 'zh-CN':
            messages = require('./lang/zh');
            locale = 'zh';
            addLocaleData(require('react-intl/locale-data/zh'));
            break;

        case 'en':
            messages = require('./lang/en');
            locale = 'en';
            addLocaleData(require('react-intl/locale-data/en'));
            break;

        default:
            messages = require('./lang/en');
            locale = 'en';
            addLocaleData(require('react-intl/locale-data/en'));
    }

    return { locale, messages }
}

