/**
 * @description 登录页面
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import { Component } from 'react';
import { DatePicker } from 'antd';
// import '../../resources/scss/modules/login/index.scss';

export default class LoginComponent extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid main" id="login">
                login
                <DatePicker />
            </div>
        );
    }
}
