/*
    异步组件同步加载的核心包
 */

import React from "react";
const DefaultSpin = () => <div>loading...</div>

class ErrorBoundary extends React.PureComponent {
    state = { hasError: false }

    static getDerivedStateFromError(error: Error | null) {
        return { hasError: true };
    }

    componentDidCatch(error: Error | null, info: object) {
        console.error(error);
    }

    render() {
        if (this.state.hasError) {
            return <div>对不起,页面加载失败</div>;
        }

        return this.props.children;
    }
}

/**
 * 默认loading参数
 * @type {*[]}
 */
const defaultLoading: [React.FC, object] = [DefaultSpin, {}];


export default (AsyncCom: Promise<{default: React.ComponentType<any>}>, loading = defaultLoading) => {
    const Com = React.lazy(() => AsyncCom);

    if(!Array.isArray(loading)){
        throw new Error("loading必须是数组");
    }

    if(typeof loading[0] !== 'function'){
        throw new Error("loading的第一个参数必须是组件");
    }

    const Loading = loading[0];
    const loadingProps = loading[1] || {};

    return (props: any) => (
        <ErrorBoundary>
            <React.Suspense fallback={<Loading {...loadingProps}/>}>
                <Com {...props} />
            </React.Suspense>
        </ErrorBoundary>
    );
};
