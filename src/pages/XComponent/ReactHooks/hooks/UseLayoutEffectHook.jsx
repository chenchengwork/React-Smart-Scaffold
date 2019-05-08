import {
    useState,
    useLayoutEffect,
} from 'react';


export default function UseLayoutEffectHook() {
    const [count, setCount] = useState(0);

    // 在大多数情况下，我们都可以使用useEffect处理副作用，
    // 但是，如果副作用是跟DOM相关的，就需要使用useLayoutEffect。
    // useLayoutEffect中的副作用会在DOM更新之后同步执行
    useLayoutEffect(
        () => {
            console.log("useLayoutEffect -> 执行");

            // cleanup清理资源, 除了第一次render不会被调用，后续的render会先执行该方法, 清理上次render的副作用
            return () => {
                console.log("useLayoutEffect -> 清理资源");
            }
        }
        /**
         * 1. 当deps参数为空数组时,即外界的值不会和当前做对比, 此时相当于componentDidMount, return回来的方法相当于componentUnmount
         * 2. 当deps参数为不填时, 每次render后都会执行相当于componentDidUpdate
         */
        // ,[]
    );
    return (
        <div>
            <p>你点击了 {count} 次</p>
            <button onClick={() => setCount(count + 1)}>
                点我
            </button>
        </div>
    );
}
