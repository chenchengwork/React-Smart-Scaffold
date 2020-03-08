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
    footerRender?: React.ReactNode;
}

/**
 * 内容组件
 */
const MainContent: React.FC<MainContentProps> = ({ className , style, children , isShowMainHeader, footerRender, ...rest }) => {
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
        }
    `;
    const footerH = footerRender ? theme.mainContentFooterHeight : 0;

    return (
        <Layout.Content className={`${mainClassName} main-content ${className}`} style={Object.assign(defaultStyle, style)} {...rest}>
            <div className="content">
                <AutoScrollbars>
                    {children}
                </AutoScrollbars>
            </div>

            {footerRender && <div className="footer">
                {footerRender}
            </div>}

            {styles}
            {/*language=SCSS*/}
            <style jsx>{`
                .content{
                    height: calc(100% - ${footerH}px);
                }
                .footer{
                    width: 100%;
                    display: flex;
                    justify-content: center;
                    align-items: center;
                    height: ${footerH}px;
                    background-color: #fff;
                     box-shadow:0px -1px 6px #333333;
                }
            `}</style>
        </Layout.Content>
    );
};
MainContent.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
};

MainContent.defaultProps = {
    className: "",
    isShowMainHeader: true,
    style: {},
    footerRender: null,
}

export default MainContent
