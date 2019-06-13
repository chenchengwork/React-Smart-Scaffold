import * as React from 'react'
import AntdSpin from './AntdSpin';
import lazy from './lazyCore';

/**
 * 默认使用antd spin
 * @param rest
 * @return {*}
 */
const lazyCom = (...rest: [Promise<{default: React.ComponentType}>, [React.FC, object]?]) => {
    if(!rest[1]){
        rest[1] = [<React.FC>AntdSpin, {}];
    }

    return lazy(...rest);
};

lazyCom.Loading = AntdSpin;

export default lazyCom;
