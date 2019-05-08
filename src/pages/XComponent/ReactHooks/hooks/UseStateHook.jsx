import { useState } from 'react';

// 测试useState钩子
const UseStateHook = () => {
    const [ count, setCount ] = useState(0);

    return (
        <div>
            <p>你点击了{count}次</p>
            <button onClick={() => setCount(count + 1)}>
                点我
            </button>
        </div>
    );
};

export default UseStateHook;
