import {
    useState,
    useDebugValue,
    useEffect
} from 'react';


export default function UseDebugValueHook() {
    const [count, setCount ] = useState(0);
    const isOnline = useFriendStatus(count);

    return (
        <div>
            <p>{isOnline ? "在线" : "离线"}-<span style={{color: "green"}}>(使用了自定义钩子)</span></p>
            <button onClick={() => setCount(count + 1)}>
                点我
            </button>
        </div>
    );
}

/**
 * 自定义钩子, 好友状态
 * @param count
 * @return {any}
 */
function useFriendStatus(count) {
    const [isOnline, setIsOnline] = useState(null);

    useEffect(() => {
        const timer = setTimeout(() => {
            setIsOnline(count % 2 === 0 ? true : false);
        }, 100);

        return () => {
            clearTimeout(timer);
        };
    });

    // 在自定义钩子中使用useDebugValue, 这样在React DevTools工具中可以看到自定义钩子的状态
    useDebugValue(isOnline? "在线" : "离线");

    return isOnline;
}
