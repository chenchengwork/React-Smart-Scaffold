import { defineMessages } from 'react-intl';
import LangUtil from './LangUtil';
import IntlWrapper from './IntlWrapper';

export const d = defineMessages;

// 导出国际化工具
export const langUtil = new LangUtil();

// 国际化包裹组件
export { IntlWrapper }
