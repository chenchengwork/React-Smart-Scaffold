import React from 'react'
import * as PropTypes from 'prop-types';
import * as css from 'styled-jsx/css';
import { Layout } from 'antd';
import { LayoutCtx } from '../layoutContext';
import {theme} from '@/constants/theme';
interface MainHeaderProps {
    className?: string;
    title?: string;
    style?: React.CSSProperties;
    leftRender?: React.ReactNode;
    rightRender?: React.ReactNode;
    leftWidth?: string | number;
    rightWidth?: string | number;
}

/**
 * 头部组件
 * @constructor
 */
const MainHeader: React.FC<MainHeaderProps> = ({ className, title, style, leftRender, rightRender,leftWidth, rightWidth }) => {

    // language=SCSS
    const getStyle = (leftWidth: number) => {
        const leftMargin = leftWidth + 2 * theme.mainInterval;

        return css.resolve`
            .app-header{
                position: fixed;
                width: calc(100% - ${leftMargin}px);
                z-index: 2;
                left: ${leftMargin - theme.mainInterval}px;
                top: ${theme.headerHeight + theme.mainInterval}px;
                display: flex;
                flex-direction: row;
                align-items: center;
                justify-content: space-between;
                //background: ${theme.mainHeaderBgColor};
                padding: 0 24px;
                height: ${theme.mainHeaderHeight}px;
                box-shadow:0px 1px 6px #333333;
            }
        `;
    }

    return (
        <LayoutCtx.Consumer>
            {({appMenuLeftWidth}) => {
                const {styles, className: appHeaderClassName} = getStyle(appMenuLeftWidth);
                return (
                    <Layout.Header className={`${appHeaderClassName} app-header ${className}`} style={style}>
                        <div className="flex-box" style={{width: leftWidth}}>
                            { title && <div className="title">{title}</div> }
                            {leftRender}
                        </div>
                        {rightRender && <div className="flex-box" style={{width: rightWidth}}>
                            {rightRender}
                            <div style={{marginRight: appMenuLeftWidth}}></div>
                        </div>}

                        {/*language=SCSS*/}
                        <style jsx>{`
                            .flex-box {
                                display: flex;
                                align-items: center;
                                & > .title{
                                  flex-shrink: 0;
                                }
                            }
                            .title {
                                font-size: 16px;
                                text-align: left;
                                margin-right: 10px;
                                //color: #99A3BF;
                            }
                        `}</style>
                        {styles}
                    </Layout.Header>
                )
            }}

        </LayoutCtx.Consumer>
    );
};

MainHeader.defaultProps = {
    className: "",
    title: "",
    style: {},
    leftRender: null,
    rightRender: null,
    leftWidth: "auto",
    rightWidth: "auto"
};

export default MainHeader;
