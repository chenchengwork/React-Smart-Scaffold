import {
    useState,
    useRef,
    useEffect
} from 'react';


export default function UseRefHook() {
    const [count, setCount] = useState(0);
    // 获取组件的ref
    const divRef = useRef(null);
    useEffect(() => {
        console.log("useRef -> ", divRef)
    });

    return (
        <div ref={divRef}>
            <p>你点击了 {count} 次</p>
            <button onClick={() => setCount(count + 1)}>
                点我
            </button>
        </div>
    );
}
