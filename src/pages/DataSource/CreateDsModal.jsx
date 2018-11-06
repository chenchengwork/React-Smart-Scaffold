import PropTypes from 'prop-types';
import Box from 'components/Box';
import JsonSchemaForm from 'JSON-Schema-antd';
import React, { Component } from 'react';
import {observer} from 'mobx-react';

import { Modal, Form, Input, Select } from 'antd';
const FormItem = Form.Item;

@observer
export default class CreateDsModal extends Component{
    static propTypes = {
        store: PropTypes.object.isRequired,
        getDsList: PropTypes.func.isRequired,
        data_source_id: PropTypes.oneOfType([PropTypes.symbol, PropTypes.string])
    };

    formRef = null;

    componentDidMount(){
        this.showModal();
    }

    showModal = () => {
        const { data_source_id, store } = this.props;
        store.triggerVisibleAction();
        store.getDsAction(data_source_id);
    };

    handleOk = () => {
        this.formRef.submit();
    };

    handleCancel = (e) => {
        this.props.store.triggerVisibleAction();
    };

    onSubmit = ({formData}) => {
        const { data_source_id, getDsList, store } = this.props;
        const { submitDsAction, triggerVisibleAction } = store;
        submitDsAction(data_source_id, formData, () => {
            getDsList();
            console.log(11111)
        });
    };

    render(){
        const { data_source_id, store } = this.props;
        const { visible, loading, saving, data, uiConf, updateDataAction} = store;
        const { dsTypes, dsJsonSchema } = uiConf;
        const jsonSchema = dsJsonSchema[data.type];

        return (
            <Modal
                title={data_source_id ? "编辑" : "创建"}
                visible={visible}
                confirmLoading={saving}
                okText="确定"
                cancelText="取消"
                onOk={this.handleOk}
                onCancel={this.handleCancel}
            >
                <Box loading={loading}>
                    <FormItem label="名称">
                        <Input
                            value={data.name}
                            onChange={(e) => updateDataAction("name", e.target.value.trim())}
                            style={{width: "100%"}}
                        />
                    </FormItem>

                    <FormItem label="数据源类型">
                        <Select
                            value={data.type}
                            onChange={(dsType) => updateDataAction("type", dsType)}
                            style={{width: "100%"}}
                        >
                            {
                                dsTypes.map((item) => (
                                    <Select.Option key={item.value} value={item.value}>{item.label}</Select.Option>
                                ))
                            }
                        </Select>
                    </FormItem>

                    {jsonSchema ? <JsonSchemaForm
                        ref={(ref) => this.formRef = ref}
                        // ArrayFieldTemplate={ArrayFieldTemplate}
                        // ObjectFieldTemplate={ObjectFieldTemplate}
                        // fields={{geo: GeoPosition}}
                        liveValidate={true}
                        schema={jsonSchema.schema || {}}
                        uiSchema={jsonSchema.uiSchema || {}}
                        formData={data.config || {}}
                        onChange={this.onFormDataChange}
                        // validate={validate}
                        // transformErrors={transformErrors}
                        onSubmit={this.onSubmit}
                        onBlur={(id, value) => {}}
                        onFocus={(id, value) =>{}}
                        onError={console.error}
                    /> : null}
                </Box>
            </Modal>
        )
    }
}
