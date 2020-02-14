import React from 'react'
import { Icon } from 'antd';
import {IconProps} from 'antd/lib/icon'
import CustomIcon from "./CustomIcon";

/**
 * icon 类型
 * @type {{antd: string, custom: string}}
 */
export const EnumIconType = {
    antd: 'antd',
    custom: 'custom'
};

export interface AppIconProps extends IconProps{
    appType?: string;
    iconType: string;
}

/**
 * 应用icon
 */
const AppIcon: React.FC<AppIconProps> = ({ appType, iconType, ...rest}) => {
    switch (appType) {
        case EnumIconType.antd:
            return <Icon type={iconType} {...rest} />;
        case EnumIconType.custom:
            return <CustomIcon type={iconType} {...rest} />;
        default:
            return null
    }
};

AppIcon.defaultProps = {
    appType: EnumIconType.custom
};

export default AppIcon;
