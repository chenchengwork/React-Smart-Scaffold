import React from 'react'
import PropTypes from 'prop-types';
import { EnumIconTypes } from "./constants/EnumDefaultMenus";
import CustomIcon from "@/components/CustomIcon";
import { Icon } from 'antd';

/**
 * 应用icon
 */
const AppIcon = ({ appType, iconType, ...rest}) => {
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
