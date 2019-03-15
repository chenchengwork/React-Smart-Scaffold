import {
    useImperativeHandle,
    useRef,
    useEffect,
    forwardRef
} from 'react';


function UseImperativeHandleHook(props, ref) {
    let inputRef = useRef();

    useImperativeHandle(ref, () => ({
        focus: () => {
            inputRef.current.focus();
        }
    }));

    return (
        <div>
            <p>获取子组件input的ref</p>
            <input ref={inputRef}/>
        </div>
    );
}


const ForwardRef = forwardRef(UseImperativeHandleHook);


export default () => {
    let inputRef = useRef();

    useEffect(() => {
        console.log("useImperativeHandle -> ", inputRef.current.focus())
    }, [inputRef]);

    return <ForwardRef ref={inputRef} />
}
