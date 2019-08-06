import React from 'react'
import AntdSpin from './AntdSpin';
import lazy from './lazyCore';

/**
 * 默认使用antd spin
 * @param rest
 * @return {*}
 */
const lazyCom = (...rest: [Promise<{default: React.ComponentType<any>}>, [React.FC, object]?]) => {
    if(!rest[1]){
        rest[1] = [AntdSpin as React.FC, {}];
    }

    return lazy(...rest);
};

lazyCom.Loading = AntdSpin;

export default lazyCom;
