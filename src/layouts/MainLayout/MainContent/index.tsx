import * as React from 'react';
import * as PropTypes from 'prop-types';
import { Layout } from 'antd';
import {LayoutProps} from 'antd/lib/layout'

interface MainContentProps extends LayoutProps{
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode;
}
/**
 * 内容组件
 * @param {String} className
 * @param {Object} style
 * @param {Array} children
 * @returns {XML}
 * @constructor
 */
const MainContent = ({ className = '', style = {}, children = null, ...rest }: MainContentProps) => {
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
