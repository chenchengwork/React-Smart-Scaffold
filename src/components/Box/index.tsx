import React from 'react';
import PropTypes from 'prop-types';
import styles from './index.scss';
import BoxSpin from '../BoxSpin';
const { Fragment } = React;

interface BoxProps {
    loading?: boolean;
    isNoData?: boolean;
    className?: string;
    style?: React.CSSProperties;
    children: React.ReactNode
}

/**
 * 盒子内容
 */
const Box: React.FC<BoxProps> = ({loading, isNoData, className, style, children}) => {
    const defaultStyle = {
        width: "100%",
        height: "100%",
    };

    return (
        <Fragment>
            {
                loading
                    ? (
                        <div className={`${styles.box} ${className}`.trim()} style={Object.assign(defaultStyle, style)}>
                            <BoxSpin />
                        </div>
                    )
                    : (
                        isNoData
                            ? <span>暂无数据</span>
                            : children
                    )
            }
        </Fragment>
    );
};

Box.defaultProps = {
    loading: false,
    isNoData: false,
    className: "",
    style: {},
}

Box.propTypes = {
    loading: PropTypes.bool,
    isNoData: PropTypes.bool,
    className: PropTypes.string,
    style: PropTypes.object
};

export default Box;
