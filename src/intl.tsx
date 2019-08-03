/*
    开启国际化的步骤:
        1. 安装依赖 npm install react-intl --save   npm install atool-l10n babel-plugin-react-intl --save-dev
        2. 在webpack配置中添加babel-plugin-react-intl插件
        3. 执行 npm run trans 进行翻译
*/
import * as React from 'react';
import { LocaleProvider } from "antd";

const lang = {
    zh: {
        antdLocale: require('antd/lib/locale-provider/zh_CN').default,
        intlLocale: "zh",

        // TODO 注释掉,关闭国际化模式
        // intlMessages: require('../locales/zh.json'),
        // localeData: require('react-intl/locale-data/zh')
    },
    // TODO 注释掉,关闭国际化模式
    // en: {
    //     antdLocale: require('antd/lib/locale-provider/en_US').default,
    //     intlLocale: "en",
    //     intlMessages: require('../locales/en.json'),
    //     localeData: require('react-intl/locale-data/en')
    // },
};


export default function LocaleWrapper({children}: {children: React.ReactNode}){


    // TODO 打开下面的注释, 开启国际化模式
    // const { antdLocale, intlLocale, intlMessages, localeData } = lang["zh"];
    // const { IntlProvider } = require("react-intl");
    // return (
    //     <LocaleProvider locale={antdLocale}>
    //         <IntlProvider locale={intlLocale} messages={{...intlMessages}}>
    //             {children}
    //         </IntlProvider>
    //     </LocaleProvider>
    // )

    // TODO 打开下面的注释, 开启非国际化模式
    const { antdLocale, intlLocale } = lang["zh"];
    return (
        <LocaleProvider locale={antdLocale}>
            {children}
        </LocaleProvider>
    );
}

