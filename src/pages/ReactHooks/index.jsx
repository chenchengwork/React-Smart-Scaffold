import { Fragment, useState } from 'react';
import { Card, Row, Col, Button, Icon } from 'antd';
import { MainHeader, MainContent} from "layouts/MainLayout";

/*
    Hooks的使用有两个原则：
        1. 不要在循环，条件判断，函数嵌套中使用hooks
        2. 只能在函数组件中使用hooks
 */
export default () => {
    const [hooks, setHooks] = useState([
        {
            label: "useState钩子",
            ComHook: require("./hooks/UseStateHook").default,
            props: {explain: "https://reactjs.org/docs/hooks-reference.html#usestate"}
        },
        {
            label: "useEffect钩子",
            ComHook: require("./hooks/UseEffectHook").default,
            props: {explain: "https://reactjs.org/docs/hooks-reference.html#useeffect"}

        },
        {
            label: "useLayoutEffect钩子",
            ComHook: require("./hooks/UseLayoutEffectHook").default,
            props: {explain: "https://reactjs.org/docs/hooks-reference.html#uselayouteffect"}
        },
        {
            label: "useCallback钩子",
            ComHook: require("./hooks/UseCallbackHook").default,
            props: {explain: "https://reactjs.org/docs/hooks-reference.html#usecallback"}
        },
        {
            label: "useMemo钩子",
            ComHook: require("./hooks/UseMemoHook").default,
            props: {explain: "https://reactjs.org/docs/hooks-reference.html#usememo"}
        },
        {
            label: "useContext钩子",
            ComHook: require("./hooks/UseContextHook").default,
            props: {explain: "https://reactjs.org/docs/hooks-reference.html#usecontext"}
        },
        {
            label: "useUseReducer钩子",
            ComHook: require("./hooks/UseReducerHook").default,
            props: {explain: "https://reactjs.org/docs/hooks-reference.html#usereducer"}
        },
        {
            label: "useRef钩子",
            ComHook: require("./hooks/UseRefHook").default,
            props: {explain: "https://reactjs.org/docs/hooks-reference.html#useref"}
        },
        {
            label: "useImperativeHandle钩子",
            ComHook: require("./hooks/UseImperativeHook").default,
            props: {explain: "https://reactjs.org/docs/hooks-reference.html#useimperativehandle"}
        },
        {
            label: "useDebugValue钩子",
            ComHook: require("./hooks/UseDebugValueHook").default,
            props: {explain: "https://reactjs.org/docs/hooks-reference.html#usedebugvalue"}
        },
    ]);

    const delHook = (idx) => {
        const newHooks = [...hooks];
        newHooks.splice(idx, 1);
        setHooks(newHooks);
    };

    return (
        <Fragment>
            <MainHeader
                title="React Hooks"
                rightRender={
                    <Button
                        type="primary"
                        onClick={()=>{ setHooks([...hooks, hooks[0]]) }}
                    >添加</Button>
                }
            />
            <MainContent>
                <Row gutter={16}>
                    {
                        hooks.map((item, idx) => {
                            const { label, ComHook, props } = item;
                            return (
                                <Col key={idx} span={6} style={{marginBottom: 16, height: 157}}>
                                    <Card
                                        title={label}
                                        extra={
                                            <span>
                                                <a target="_blank" href={props.explain}>
                                                    文档
                                                </a>
                                                <a onClick={() => delHook(idx)} style={{color: "red", marginLeft: 5}}>
                                                    <Icon type="delete" />
                                                </a>
                                            </span>
                                        }
                                    >
                                        <ComHook />
                                    </Card>
                                </Col>
                            )
                        })
                    }
                </Row>
            </MainContent>
        </Fragment>
    )
}



