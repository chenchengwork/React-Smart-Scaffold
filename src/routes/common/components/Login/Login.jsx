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
        router:PropTypes.object.isRequired
    };

    constructor() {
        super();
        this.onEmailChange = this.onEmailChange.bind(this);
        this.onPasswordChange = this.onPasswordChange.bind(this);
        this.onSubmit = this.onSubmit.bind(this);

        this.state = {
            email: '',
            password: '',
            loading: false

        };
    }
    componentDidMount(){

    }
    onEmailChange(e) {
        this.setState({
            email: e.target.value.trim()
        });
    }

    onPasswordChange(e) {
        this.setState({
            password: e.target.value.trim()
        });
    }

    onSubmit() {
        const { email, password } = this.state;

        this.setState({ loading: true });

        doLoginAction(email, password).then((resp) => {

            this.setState({ loading: false });

            const respLoginData = resp.data;

            T.storage.setStorage('respLoginData', respLoginData);

            // T.helper.redirect(EnumRouter.screenList);
            this.context.router.history.push(EnumRouter.screenList);
        }, (resp) => {
            this.setState({ loading: false });
            T.message.error(resp.msg);
        });
    }

    render() {
        return (<div className="login">
            <img src={logo} className="img-top" alt="login-top" />
            <div className="login_box">
                <div className="login_box_left">
                    <div className="login_top">用户登录</div>
                    <input
                        type="text"
                        value={this.state.email}
                        className="login_acount"
                        onChange={this.onEmailChange}
                        placeholder="邮箱"
                        onKeyDown={(e)=>{
                           if(e.keyCode === 13){
                               this.onSubmit();
                           }
                       }}
                    />
                    <input
                        type="password"
                        value={this.state.password}
                        className="login_password"
                        onChange={this.onPasswordChange}
                        placeholder="密码"
                        onKeyDown={(e)=>{
                            if(e.keyCode === 13){
                                this.onSubmit();
                            }
                        }}
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
            <ul className="footer_nav">
                <li>
                    <a href="http://www.tianjishuju.com/index.html" target="_blank">首&emsp;&nbsp;页</a>
                    |
                </li>
                <li>
                    <a href="http://www.tianjishuju.com/product.html" target="_blank">产品技术</a>
                    |
                </li>
                <li>
                    <a href="http://www.tianjishuju.com/solution.html" target="_blank">解决方案</a>
                    |
                </li>
                <li>
                    <a href="http://www.tianjishuju.com/case_aviation.html" target="_blank">实施案例</a>
                    |
                </li>
                <li>
                    <a href="http://www.tianjishuju.com/about.html" target="_blank">关于我们</a>

                </li>
            </ul>
            <div className="bottom_">Copyright @ 2016-2017 天机数据 京ICP备09083760号-9 | 京公网安备11010502032535</div>
        </div>);
    }
}
