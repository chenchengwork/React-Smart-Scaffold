import styles from './index.scss';
import React from 'react';


/**
 * 应用错误便捷
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
            return <h1 className={styles["text-center"]}>页面产生错误，请联系管理员!</h1>;
        }

        return this.props.children;
    }
}
