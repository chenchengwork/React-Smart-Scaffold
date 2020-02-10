import React from 'react'
import { Icon } from 'antd';
import {IconProps} from 'antd/lib/icon'
import CustomIcon from "./CustomIcon";

/**
 * icon 类型
 * @type {{antd: string, custom: string}}
 */
export const EnumIconTypes = {
    antd: 'antd',
    custom: 'custom'
};

export interface AppIconProps extends IconProps{
    appType: string;
    iconType: string;
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
        case EnumIconTypes.antd:
            return <Icon type={iconType} {...rest} />;
        case EnumIconTypes.custom:
            return <CustomIcon type={iconType} {...rest} />;
        default:
            return null
    }
};

export default AppIcon;
