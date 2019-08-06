import React from 'react'
import * as PropTypes from 'prop-types';
import {EnumIconTypes} from "./constants/EnumDefaultMenus";
import CustomIcon from "@/components/CustomIcon";
import { Icon } from 'antd';
import {IconProps} from 'antd/lib/icon'

interface AppIconProps extends IconProps{
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
const AppIcon = ({ appType, iconType, ...rest}: AppIconProps) => {
    switch (appType) {
        case EnumIconTypes.antd:
            return <Icon type={iconType} {...rest} />;
        case EnumIconTypes.custom:
            return <CustomIcon type={iconType} {...rest} />;
        default:
            return null
    }
};

AppIcon.propTypes = {
    appType: PropTypes.string.isRequired,
    iconType: PropTypes.string.isRequired,
};


export default AppIcon;
