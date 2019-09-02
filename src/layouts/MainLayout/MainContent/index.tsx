import React from 'react';
import * as PropTypes from 'prop-types';
import { Layout } from 'antd';
import {LayoutProps} from 'antd/lib/layout'
import { theme } from '../theme';
interface MainContentProps extends LayoutProps{
    className?: string;
    style?: React.CSSProperties;
    isShowMainHeader?: boolean;
    children: React.ReactNode;
}
/**
 * 内容组件
 */
const MainContent: React.FC<MainContentProps> = ({ className = '', style = {}, children = null, isShowMainHeader = true, ...rest }) => {
    let defaultStyle = {
        // margin: '0px 10px 0px 10px',
        marginTop: isShowMainHeader ? theme.mainHeaderHeight : 0
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
