import React, { useState } from 'react';
import {Drawer} from 'antd';

export default () => {
    const [visible, setVisible] = useState(false);
    const onClose = () => {
        setVisible(!visible);
    }

    return (
        <Drawer
            title="Basic Drawer"
            placement="right"
            closable={false}
            onClose={onClose}
            visible={visible}
        >
            <p>Some contents...</p>
            <p>Some contents...</p>
            <p>Some contents...</p>
        </Drawer>
    )
}
