/**
 * Created by chencheng on 17-9-13.
 */
import React from "react";
import PropTypes from 'prop-types';
import { Spin } from 'antd';
import { SpinProps } from 'antd/lib/spin'

interface BoxSpinProps {
    style?: React.CSSProperties;
    spinProps?: SpinProps
}

const BoxSpin: React.FC<BoxSpinProps> = ({ style, spinProps}) => {
    style = Object.assign({
        position: 'relative',
        width: '100%',
        minHeight: 200,
        textAlign: 'center',
    }, style);

    return (
        <div style={style} className="box-spin">
            <Spin {...spinProps} />

            {/*language=SCSS*/}
            <style>{`
                .box-spin {
                    display: flex;
                    align-items: center;
                    justify-content: center;
                }
            `}</style>
        </div>
    );
};

BoxSpin.defaultProps = {
    style: {},
    spinProps: {}
};

BoxSpin.propTypes = {
    style: PropTypes.object,
    spinProps: PropTypes.object
};

export default BoxSpin;
