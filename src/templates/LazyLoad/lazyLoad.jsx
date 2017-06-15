/**
 * @description 页面的加载动画
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */
import  {Component} from 'react';
import PropTypes from 'prop-types';

export default class LazyLoadTpl extends Component {

    static propTypes = {
        // 延迟加载函数
        lazyLoader: PropTypes.func.isRequired
    };

    state = {
        Component: null
    };

    componentDidMount() {

        if (!this.state.Component) {

            // 挂载完成后,开始加载远程组件
            this.props.lazyLoader(Component => this.setState({
                Component
            }));

        }

    }

    render() {
        const Component = this.state.Component;

        if (Component) {

            return <Component.default {...this.props} />;

        }

        // 默认显示加载动画
        // return <LoadingTpl size="large" />;
        return <div>loading...</div>

    }
}
