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
}

/**
 * 头部组件
 * @constructor
 */
const MainHeader: React.FC<MainHeaderProps> = ({ className, title, style, leftRender, rightRender }) => {

    // language=SCSS
    const {styles, className: appHeaderClassName} = css.resolve`
        .app-header{
            position: fixed;
            width: 100%;
            z-index: 2;
            top: ${theme.headerHeight}px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            background: #fff;
            padding: 0 24px;
            height: ${theme.mainHeaderHeight}px;
             box-shadow:0px 1px 6px #333333;
        }
    `

    return (
        <LayoutCtx.Consumer>
            {({appMenuLeftWidth}) => {
                return (
                    <Layout.Header className={`${appHeaderClassName} app-header ${className}`} style={style}>
                        <div className="flex-box">
                            {title && <div className="title">{title}</div> }
                            {leftRender}
                        </div>
                        {rightRender && <div className="flex-box">
                            {rightRender}
                            <div style={{marginRight: appMenuLeftWidth}}></div>
                        </div>}

                        {/*language=SCSS*/}
                        <style jsx>{`
                            .flex-box {
                                display: flex;
                                align-items: center;
                                //width: 100%;
                            }
                            .title {
                                font-size: 18px;
                                text-align: left;
                                margin-right: 10px;
                                color: #99A3BF;
                            }
                        `}</style>
                        {styles}
                    </Layout.Header>
                )
            }}

        </LayoutCtx.Consumer>
    );
};

MainHeader.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    leftRender: PropTypes.node,
    rightRender: PropTypes.node,
};

MainHeader.defaultProps = {
    className: "",
    title: "",
    style: {},
    leftRender: null,
    rightRender: null
};

export default MainHeader;
