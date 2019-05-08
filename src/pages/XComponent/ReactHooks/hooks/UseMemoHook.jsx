import {
    useState,
    useMemo,
} from 'react';


export default function UseMemoHook() {
    const [count, setCount] = useState(0);

    // 它接收一个内联函数和一个数组，它返回的是一个记忆化版本的值
    const memoizedValue1 = useMemo(() => {
        return count;
    }, [count]);

    console.log('memoizedValue1记忆 num -> ', memoizedValue1);
    console.log('memoizedValue1原始 num -> ', count);

    // 它接收一个内联函数和一个数组，它返回的是一个记忆化版本的值
    const memoizedValue2 = useMemo(() => {
        return count;
    }, []);

    console.log('memoizedValue2记忆 num -> ', memoizedValue2);
    console.log('memoizedValue2原始 num -> ', count);
    return (
        <div>
            <p>你点击了 {count} 次</p>
            <button onClick={() => setCount(count + 1)}>
                点我
            </button>
        </div>
    );
}
