/**
 * Created by chencheng on 17-9-13.
 */
import React from "react";
import * as PropTypes from 'prop-types';
import styles from './index.scss';
import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin'

interface BoxSpinProps {
    style?: React.CSSProperties;
    spinProps?: SpinProps
}

export default function BoxSpin({ style = {}, spinProps = {}}: BoxSpinProps) {
    style = Object.assign({
        position: 'relative',
        width: '100%',
        minHeight: 200,
        textAlign: 'center',
    }, style);

    return (
        <div style={style} className={styles.center}>
            <Spin {...spinProps} />
        </div>
    );
}

BoxSpin.propTypes = {
    style: PropTypes.object,
    spinProps: PropTypes.object
};
