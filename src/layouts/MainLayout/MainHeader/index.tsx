import * as React from 'react'
import * as PropTypes from 'prop-types';
import * as css from 'styled-jsx/css';
import { Layout } from 'antd';

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
const MainHeader: React.FC<MainHeaderProps> = ({ className = '', title = '', style = {}, leftRender = null, rightRender = null }) => {

    // language=SCSS
    const {styles, className: appHeaderClassName} = css.resolve`
        .app-header{
            position: fixed;
            width: 100%;
            z-index: 2;
            top: 50px;
            display: flex;
            flex-direction: row;
            align-items: center;
            justify-content: space-between;
            background: #edf1f5;
            padding: 0 24px;
            height: 45px;
        }
    `

    return (
        <Layout.Header className={`${appHeaderClassName} app-header ${className}`} style={style}>
            <div className="flex-box">
                <div className="title">{title}</div>
                {leftRender}
            </div>
            <div className="flex-box">
                {rightRender}
            </div>

            {/*language=SCSS*/}
            <style jsx>{`
                .flex-box {
                    display: flex;
                    flex-direction: row;
                    align-items: center;
                }
                .title {
                    font-size: 18px;
                    text-align: left;
                    color: #99A3BF;
                }
        `}</style>
            {styles}
        </Layout.Header>
    );
};

MainHeader.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    leftRender: PropTypes.node,
    rightRender: PropTypes.node,
};

export default MainHeader;
