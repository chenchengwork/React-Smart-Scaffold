import React from 'react'
import CustomIcon from "./CustomIcon";
import { AntdIconProps } from '@ant-design/icons/lib/components/AntdIcon'

/**
 * icon 类型
 * @type {{antd: string, custom: string}}
 */
export const EnumIconType = {
    antd: 'antd',
    custom: 'custom'
};

export interface AppIconProps extends AntdIconProps{
    appType?: string;
    iconType: string | React.FC<AntdIconProps>;
}

/**
 * 应用icon
 * @param appType
 * @param iconType
 * @return {*}
 * @constructor
 */
const AppIcon: React.FC<AppIconProps> = ({ appType, iconType, ...rest}) => {
    switch (appType) {
        case EnumIconType.antd:
            const RealIcon = iconType;
            return <RealIcon {...rest} />;
        case EnumIconType.custom:
            return <CustomIcon type={iconType as string} {...rest} />;
        default:
            return null
    }
};

AppIcon.defaultProps = {
    appType: EnumIconType.custom
};

export default AppIcon;
