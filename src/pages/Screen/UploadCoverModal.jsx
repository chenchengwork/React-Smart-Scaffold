import PropTypes from 'prop-types';
import Box from 'components/Box';
import React, { Component } from 'react';
import {observer} from 'mobx-react';

import { Modal, Form, Upload, Button } from 'antd';
const FormItem = Form.Item;

@observer
class CreateForm extends Component {
    normFile = (e) => {
        if (Array.isArray(e))  return e;
        return e;
    };

    render() {
        const { store, form } = this.props;
        const { getFieldDecorator } = form;

        return (
            <Form layout="vertical">
                <FormItem label="" wrapperCol={{span: 10, offset: 9}}>
                    {getFieldDecorator('cover', {
                        valuePropName: 'file',
                        getValueFromEvent: this.normFile,
                    })(
                        <Upload beforeUpload={() => false}>
                            <Button icon="upload">选择封面</Button>
                        </Upload>
                    )}
                </FormItem>
            </Form>
        );
    }
}
const CollectionCreateForm = Form.create()(CreateForm);

@observer
export default class UploadCoverModal extends Component{
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
        if(screen_id) store.getScreenAction(screen_id);
    };

    handleOk = () => {
        const { screen_id, store, getScreenList } = this.props;
        const form = this.formRef.props.form;

        form.validateFields((err, values) => {
            if (err) return false;
            // console.log('Received values of form: ', values);
            store.submitCoverAction(screen_id, {cover: values.cover.file}, () => getScreenList());
        });

    };

    handleCancel = () => this.props.store.triggerVisibleAction();

    render(){
        const { store } = this.props;
        const { visible, loading, saving} = store;

        return (
            <Modal
                title="上传封面"
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
