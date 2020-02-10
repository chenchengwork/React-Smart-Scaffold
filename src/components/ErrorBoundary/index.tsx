import React from 'react';

/**
 * 应用错误边界
 */
export default class ErrorBoundary extends React.PureComponent {
    state = {
        hasError: false,
        error: "",
        info: "",
    }

    componentDidCatch(error: Error | null, info: React.ErrorInfo) {
        this.setState({ hasError: true, error, info });
    }

    render() {
        if (this.state.hasError) {
            return (
                <div>
                    <h1 style={{textAlign: "center"}}>页面产生错误，请联系管理员!</h1>
                </div>
            )

        }

        return this.props.children;
    }
}
