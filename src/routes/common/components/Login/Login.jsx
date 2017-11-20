import PropTypes from 'prop-types';
import { Component } from 'react';
import { Button } from 'antd';

import EnumRouter from 'constants/EnumRouter';
import './Login.scss';
import T from 'utils/T';
import { doLoginAction } from '../../actions/login';

const logo = require('./img/logo2.png');
const rightLoginImg = require('./img/right_login.png');

export default class Login extends Component {
    static contextTypes = {
        store: PropTypes.object.isRequired,
        router: PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.state = {
            user_email: '',
            user_password: '',
            loading: false
        };
    }

    onEnterDown = (e) => e.keyCode === 13 ? this.onSubmit() : null;

    onSubmit = () => {
        const { user_email, user_password } = this.state;

        this.setState({ loading: true }, () => {
            doLoginAction(user_email, user_password).then((resp) => {
                this.setState({ loading: false }, () => {
                    T.auth.loginSuccessRedirect(this.context.router.history);
                });
            }, (resp) => {
                this.setState({ loading: false });
                T.prompt.error(resp.msg);
            });
        });
    }

    render() {
        return (<div className="login">
            <img src={logo} className="img-top" alt="login-top" />
            <div className="login_box">
                <div className="login_box_left">
                    <div className="login_top">后台登录</div>
                    <input
                        type="text"
                        value={this.state.user_email}
                        className="login_email"
                        onChange={(e) => this.setState({user_email: e.target.value.trim()})}
                        placeholder="邮箱"
                        onKeyDown={this.onEnterDown}
                    />
                    <input
                        type="password"
                        value={this.state.user_password}
                        className="login_password"
                        onChange={(e) => this.setState({user_password: e.target.value.trim()})}
                        placeholder="密码"
                        onKeyDown={this.onEnterDown}
                    />

                    <Button
                        className="btn_login" loading={this.state.loading ? { delay: 300 } : false}
                        onClick={this.onSubmit}
                    >
                        登&nbsp;&nbsp;录
                    </Button>
                </div>
                <img src={rightLoginImg} className="img_right" alt="login-right" />
            </div>
            <div className="bottom_">Copyright @ 2016-2017 天机数据 京ICP备09083760号-9 | 京公网安备11010502032535</div>
        </div>);
    }
}
