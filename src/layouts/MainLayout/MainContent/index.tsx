import React from 'react';
import PropTypes from 'prop-types';
import css from 'styled-jsx/css';
import { Layout } from 'antd';
import {LayoutProps} from 'antd/lib/layout'
import {theme} from '@/constants/theme';
import AutoScrollbars from "@/components/AutoScrollbars";
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
    const padding = 5;
    let defaultStyle = {
        paddingTop: isShowMainHeader ? theme.headerHeight + theme.mainHeaderHeight + padding : theme.headerHeight + padding,
        paddingLeft: padding,
        paddingRight: padding,
        paddingBottom: padding,
    };

    //language=SCSS
    const {styles, className: mainClassName} = css.resolve`
        .main-content{
             height: 100%;
             overflow-y: auto;
        }
    `;

    return (
        <Layout.Content className={`${mainClassName} main-content ${className}`} style={Object.assign(defaultStyle, style)} {...rest}>
            <AutoScrollbars>
            {children}
            </AutoScrollbars>
            {styles}
        </Layout.Content>
    );
};
MainContent.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node
};

export default MainContent
