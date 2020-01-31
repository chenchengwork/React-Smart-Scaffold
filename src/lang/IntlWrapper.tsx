import React, {Fragment} from 'react';
import {ConfigProvider} from "antd";
import {IntlProvider, useIntl} from 'react-intl';
import {EnumLangType} from '@/lang/EnumLangType';
import EnumEnv from '@/constants/EnumEnv';
import {langUtil} from '@/lang';

const {lang: currentLang} = EnumEnv.intl;

const lang = {
    [EnumLangType.zh]: {
        antdLocale: require('antd/lib/locale-provider/zh_CN').default,
        intlLocale: EnumLangType.zh,
        intlMessages: require('../../locales/zh.json'),
    },
    [EnumLangType.en]: {
        antdLocale: require('antd/lib/locale-provider/en_US').default,
        intlLocale: EnumLangType.en,
        intlMessages: require('../../locales/en.json'),
    },
};

const InitIntl: React.FC = ({children}) => {
    langUtil.setIntl(useIntl());

    return <Fragment>{children}</Fragment>
};

const IntlWrapper: React.FC = ({children}) => {
    const {antdLocale, intlLocale, intlMessages} = lang[currentLang];

    return (
        <ConfigProvider locale={antdLocale}>
            <IntlProvider locale={intlLocale} messages={{...intlMessages}}>
                <InitIntl>{children}</InitIntl>
            </IntlProvider>
        </ConfigProvider>
    );
};

export default IntlWrapper
