/**
 * Created by chencheng on 16-7-12.
 */

import {addLocaleData} from 'react-intl'

import T from './utils/T'

function getLocale(){
    var messages = {},
        locale = 'zh',
        langType = 'zh-CN';

    var lang = T.cookies.get('tj_langKey');
    if(lang){
        langType = lang == 'zh' ? 'zh-CN' : 'en';
    }


    //switch (navigator.language.split('_')[0]){
    switch (langType){

        case 'zh-CN':
            messages = require('./lang/zh');
            locale = 'zh';
            var zh = require('react-intl/locale-data/zh');
            addLocaleData(zh);
            break;

        case 'en':
            messages = require('./lang/en');
            locale = 'en';
            var en = require('react-intl/locale-data/en');
            addLocaleData(en);
            break;

        default:
            messages = require('./lang/en');
            locale = 'en';
            var en = require('react-intl/locale-data/en');
            addLocaleData(en);
    }

    return {
        locale:locale,
        messages:messages,
    }
}

module.exports = {
    getLocale:getLocale
};
