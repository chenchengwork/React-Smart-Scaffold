import React from 'react';
import PropTypes from 'prop-types';
import {Icon} from 'antd';
import { IconProps } from 'antd/lib/icon'

const MyIcon = Icon.createFromIconfontCN({
    scriptUrl: require("./iconfont"), // 在 iconfont.cn 上生成, 下载到本地icon.js中
});

/**
 * 自定义icon
 */
const CustomIcon: React.FC<IconProps> = ({ type,  ...rest }) => {

    return <MyIcon type={`icon-${type}`} {...rest} />;
};
CustomIcon.propTypes = {
    type: PropTypes.string.isRequired,      // icon类型
};

export default CustomIcon;
