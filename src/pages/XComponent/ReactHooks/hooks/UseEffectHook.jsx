import {
    useState,
    useEffect,
} from 'react';


export default function UseEffectHook() {
    const [count, setCount] = useState(0);

    // seEffect用于处理大多数副作用，其中的回调函数会在render执行之后在调用，确保不会阻止浏览器的渲染，
    // 这跟componentDidMount和componentDidUpdate是不一样的，他们会在渲染之后同步执行
    useEffect(
        () => {
            console.log("useEffect -> 执行");
            // cleanup清理资源, 除了第一次render不会被调用，后续的render会先执行该方法, 清理上次render的副作用
            return () => {
                console.log("useEffect -> 清理资源");
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
