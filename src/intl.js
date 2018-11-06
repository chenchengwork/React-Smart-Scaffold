import { LocaleProvider } from "antd";
import zhCN from 'antd/lib/locale-provider/zh_CN';

export default function LocaleWrapper({children}){
    return (
        <LocaleProvider locale={zhCN}>{children}</LocaleProvider>
    )
}
