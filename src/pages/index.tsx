import React, { useState } from 'react';
import { withRouter, RouteComponentProps } from 'react-router-dom';
import {Input, Button} from 'antd';
import { LoadingOutlined } from '@ant-design/icons'
import AppIcon from "@/components/AppIcon";
import prompt from '@/utils/prompt';
import EnumEnv from '@/constants/EnumEnv';
import {login} from '@/services/auth';

const Login = ({history}: RouteComponentProps) => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [submitting, setSubmitting] = useState(false)

    const handleSubmit = () => {
        setSubmitting(true);
        login(email, password).then(resp => {
            prompt.success("登录成功");
            setSubmitting(false);
            history.push(EnumEnv.login.defaultRedirectUrl);
        }, resp => {
            prompt.error(resp.msg);
            setSubmitting(false);
        })
    };

    return (
        <div className="main">
            <div style={{fontSize: 18, textAlign: "center", marginTop: 20, fontWeight: 900}}>登录</div>
            <Input
                {...{
                    size: 'large',
                    prefix: <AppIcon appType="antd" iconType={require('@ant-design/icons').MailOutlined} style={{fontSize: 14}}/>,
                    placeholder: '邮箱',
                    style: {marginBottom: 10},
                    value: email,
                    onChange: (e) => setEmail(e.target.value.trim())
                }}
            />

            <Input {...{
                type: "password",
                size: 'large',
                prefix: <AppIcon appType="antd" iconType={require('@ant-design/icons').LockOutlined} style={{fontSize: 14}}/>,
                placeholder: '密码',
                value: password,
                onChange: (e) => setPassword(e.target.value.trim())
            }} />

            <Button type="primary" icon={submitting ? <LoadingOutlined />: ""} size="large" onClick={handleSubmit} style={{width: "100%", marginTop: 24}}>登录</Button>

            {/*language=SCSS*/}
            <style jsx>{`
                .main {
                    width: 368px;
                    margin: 0 auto;
                    @media screen and (max-width: 576px) {
                        width: 95%;
                    }
                }
            `}</style>
        </div>
    );
}


export default withRouter(Login)


