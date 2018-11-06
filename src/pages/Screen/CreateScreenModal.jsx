import PropTypes from 'prop-types';
import Box from 'components/Box';
import React, { Component } from 'react';
import {observer} from 'mobx-react';

import { Modal, Form, Input } from 'antd';
const FormItem = Form.Item;

@observer
class CreateForm extends Component {
    render() {
        const { store, form } = this.props;
        const { getFieldDecorator } = form;
        const { data } = store;

        return (
            <Form layout="vertical">
                <FormItem label="大屏名称">
                    {getFieldDecorator('name', {
                        initialValue: data.name,
                        rules: [{ required: true, message: '请填写大屏名称!' }],
                    })(
                        <Input />
                    )}
                </FormItem>
            </Form>
        );
    }
}
const CollectionCreateForm = Form.create()(CreateForm);

@observer
export default class CreateScreenModal extends Component{
    static propTypes = {
        store: PropTypes.object.isRequired,
        getScreenList: PropTypes.func.isRequired,
        screen_id: PropTypes.oneOfType([PropTypes.symbol, PropTypes.string])
    };

    formRef = null;

    componentDidMount(){
        this.showModal();
    }

    showModal = () => {
        const { screen_id, store } = this.props;
        store.triggerVisibleAction();
        if(screen_id){
            store.getScreenAction(screen_id);
        }
    };

    handleOk = () => {
        const { screen_id, store, getScreenList } = this.props;
        const form = this.formRef.props.form;

        form.validateFields((err, values) => {
            if (err) return false;

            // console.log('Received values of form: ', values);
            // form.resetFields();
            // this.setState({ visible: false });
            store.submitScreenAction(screen_id, values, () => getScreenList());
        });

    };

    handleCancel = (e) => {
        this.props.store.triggerVisibleAction();
    };

    render(){
        const { screen_id, store } = this.props;
        const { visible, loading, saving} = store;

        return (
            <Modal
                title={screen_id ? "编辑" : "创建"}
                visible={visible}
                confirmLoading={saving}
                okText="确定"
                cancelText="取消"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Box loading={loading}>
                    <CollectionCreateForm
                        wrappedComponentRef={(formRef) => this.formRef = formRef}
                        store={store}
                    />
                </Box>
            </Modal>
        )
    }
}
