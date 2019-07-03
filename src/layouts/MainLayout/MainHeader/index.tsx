import * as React from 'react'
import * as PropTypes from 'prop-types';
import styles from "./index.scss";
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
 * @param {String} className
 * @param {String} title
 * @param {Object} style
 * @param {Function} leftRender
 * @param {Function} rightRender
 * @returns {XML}
 * @constructor
 */
const MainHeader = ({ className = '', title = '', style = {}, leftRender = null, rightRender = null }: MainHeaderProps) => {
    let customClassName = styles['app-header'];
    if (className) {
        customClassName = className + ' ' + customClassName;
    }

    let defaultStyle = {
        marginBottom: 10
    };

    const headerContent = [
        <div key="1" className={styles["flex-box"]}>
            <div className={styles["title"]}>{title}</div>
            {leftRender}
        </div>,
        <div key="2" className={styles["flex-box"]}>
            {rightRender}
        </div>
    ];

    return (
        <Layout.Header className={customClassName} style={Object.assign(defaultStyle, style)}>
            {headerContent}
        </Layout.Header>
    );
};
MainHeader.propTypes = {
    className: PropTypes.string,
    style: PropTypes.object,
    children: PropTypes.node,
    leftRender: PropTypes.node,
    rightRender: PropTypes.node,
};

export default MainHeader;