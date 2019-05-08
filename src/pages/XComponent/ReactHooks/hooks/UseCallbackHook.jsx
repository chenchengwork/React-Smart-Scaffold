import {
    useState,
    useCallback,
} from 'react';


export default function UseCallbackHook() {
    const [count, setCount] = useState(0);

    // 它接收一个内联函数和一个数组，它返回的是一个记忆化版本的函数
    const memoizedCallback1 = useCallback((a) => {
        return count;
    }, [count]);

    console.log('useCallback1记忆 num -> ', memoizedCallback1());
    console.log('useCallback1原始 num -> ', count);

    // 它接收一个内联函数和一个数组，它返回的是一个记忆化版本的函数
    const memoizedCallback2 = useCallback((a) => {
        return count;
    }, []);

    console.log('useCallback2记忆 num -> ', memoizedCallback2());
    console.log('useCallback2原始 num -> ', count);
    return (
        <div>
            <p>你点击了 {count} 次</p>
            <button onClick={() => setCount(count + 1)}>
                点我
            </button>
        </div>
    );
}
