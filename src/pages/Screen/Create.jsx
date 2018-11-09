import PropTypes from 'prop-types';
import React, { PureComponent } from 'react';
import { Form, Input } from 'antd';
const FormItem = Form.Item;

import prompt from 'utils/prompt';
import { screen } from 'services/api';

class Create extends PureComponent {
    static propTypes = {
        modalControl: PropTypes.object,
        screen_id: PropTypes.number
    };

    componentDidMount(){
        this.props.modalControl.registerOk(this.handleSubmit);
        this.loadData();
    }

    loadData = () => {
        const { screen_id } = this.props;
        if(screen_id){
            screen.get(screen_id).then(() => {

            })
        }
    };

    handleSubmit = () => {
        const { screen_id } = this.props;
        this.props.form.validateFields((err, values) => {
            if (!err) {
                // console.log('Received values of form: ', values);
                if(screen_id) {
                    screen.create(values).then(
                        () => this.props.modalControl.close(),
                        (resp) => prompt.error(resp.msg)
                    );
                }else {
                    screen.update(screen_id, values).then(
                        () => this.props.modalControl.close(),
                        (resp) => prompt.error(resp.msg)
                    );
                }
            }else {
                this.props.modalControl.hideSaving();
            }
        });
    };

    render() {
        const { getFieldDecorator } = this.props.form;
        return (
            <Form onSubmit={this.handleSubmit} className="login-form">
                <FormItem>
                    {getFieldDecorator('name', {
                        rules: [{ required: true, message: '请输入姓名!' }],
                    })(
                        <Input  placeholder="姓名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('age', {
                        rules: [{ required: true, message: '请输入年龄!' }],
                    })(
                        <Input placeholder="年龄" />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('address', {
                        rules: [{ required: true, message: '请输入住址!' }],
                    })(
                        <Input placeholder="住址" />
                    )}
                </FormItem>
            </Form>
        );
    }
}

export default Form.create()(Create);
