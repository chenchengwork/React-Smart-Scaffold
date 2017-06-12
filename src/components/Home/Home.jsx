/**
 * @description 登录页面
 * @author vision <vision.shi@tianjishuju.com>
 * @license www.tianjishuju.com/license
 */

import { Component } from 'react';
import { DatePicker } from 'antd';

export default class Home extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="container-fluid main" id="login">
                home
                <DatePicker />
            </div>
        );
    }
}
