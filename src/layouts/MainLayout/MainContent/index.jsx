import React from 'react';
import PropTypes from 'prop-types';
import { Layout } from 'antd';

/**
 * 内容组件
 */
const MainContent = ({ className = '', style = {}, children = null, ...rest }) => {
    let defaultStyle = {
        // margin: '0px 10px 0px 10px',
    };
    return (
        <Layout.Content className={className} style={Object.assign(defaultStyle, style)} {...rest}>
            {children}
        </Layout.Content>
    );
};

MainContent.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
};

export default MainContent
