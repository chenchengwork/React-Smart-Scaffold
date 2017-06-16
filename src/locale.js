/**
 * Created by chencheng on 16-7-12.
 */
import T from './utils/T'
import { addLocaleData } from 'react-intl'

import enUS from 'antd/lib/locale-provider/en_US';

/**
 * 获取国际化信息
 * @returns {{locale: string, messages: {}}}
 */
export function getLocale(){
    let messages = {},
        antIntlMsg = {},
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
			antIntlMsg = null;
            addLocaleData(require('react-intl/locale-data/zh'));
            break;

        case 'en':
            messages = require('./lang/en');
            locale = 'en';
			antIntlMsg = enUS;
            addLocaleData(require('react-intl/locale-data/en'));
            break;

        default:
            messages = require('./lang/en');
            locale = 'en';
			antIntlMsg = enUS;
            addLocaleData(require('react-intl/locale-data/en'));
    }

    return { locale, messages,antIntlMsg }
}

