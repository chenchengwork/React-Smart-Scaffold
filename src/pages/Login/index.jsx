import {decorator} from 'utils/T';
import prompt from 'utils/prompt';
import React, { Component } from 'react';
import {  Alert } from 'antd';
import Login from './lib';
import styles from './index.scss';
const { Tab, UserEmail, Password, Submit } = Login;
const { login } = window.ENV;

@decorator.contextTypes("router")
export default class LoginPage extends Component {
    static defaultProps = {
        login: {
            status: "success",
            type: ""
        },
        submitting: false,
    }

    state = {
        type: 'account',
        autoLogin: true,
    };

    onTabChange = type => this.setState({ type });

    handleSubmit = (err, values) => {
        if(err) return false;

        const { user_email, password } = values;
        this.setState({submitting: true}, () => {
            // doLogin(user_email, password).then(resp => {
            //     prompt.success("登录成功");
            //     this.setState({submitting: false});
            //     this.context.router.history.push(login.defaultRedirectUrl);
            // }, resp => {
            //     prompt.error(resp.msg);
            //     this.setState({submitting: false});
            // })
        })
    };

    changeAutoLogin = e => {
        this.setState({
            autoLogin: e.target.checked,
        });
    };

    renderMessage = content => {
        return <Alert style={{ marginBottom: 24 }} message={content} type="error" showIcon />;
    };

    render() {
        const { login, submitting } = this.props;
        const { type, autoLogin } = this.state;

        return (
            <div className={styles.main}>
                <Login defaultActiveKey={type} onTabChange={this.onTabChange} onSubmit={this.handleSubmit}>
                    <Tab key="account" tab="登录">
                        {login.status === 'error' &&
                        login.type === 'account' &&
                        !submitting &&
                        this.renderMessage('账户或密码错误')}
                        <UserEmail name="user_email" placeholder="邮箱" />
                        <Password name="password" placeholder="密码" />
                    </Tab>

                    <Submit loading={submitting}>登录</Submit>
                    <div className={styles.other}>

                    </div>
                </Login>
            </div>
        );
    }
}
