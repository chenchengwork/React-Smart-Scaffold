import PropTypes from 'prop-types';
import React, { Component, useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { Form, Input } from 'antd';
import Box from '@/components/Box';
const FormItem = Form.Item;

const Create = observer(({modalControl, screen_id, createStore, listStore}) => {
    const [ form, setForm ] = useState(null);
    useEffect(() => {
        modalControl.registerOk(handleSubmit);
    });

    useEffect(() => {
        createStore.fetchData(screen_id);
    }, []);

    const handleSubmit = () => {
        form && form.validateFields((err, values) => {
            if (!err) {
                createStore.save(screen_id, values,
                    () => {
                        listStore.fetchPageList();
                        modalControl.close()
                    },
                    () => modalControl.hideSaving()
                )
            }else {
                modalControl.hideSaving();
            }
        });
    };

    const { data, loading } = createStore;

    return (
        <Box loading={loading}>
            <CreateFormWrapper data={data} loading={loading} setForm={setForm}/>
        </Box>
    )
});

Create.propTypes = {
    modalControl: PropTypes.object,
    screen_id: PropTypes.string,
    createStore: PropTypes.object,
    listStore: PropTypes.object,
};

export default Create;

class CreateForm extends Component {
    componentDidMount() {
        this.props.setForm(this.props.form);
    }

    render() {
        const { getFieldDecorator } = this.props.form;
        const { data } = this.props;

        return (
            <Form className="login-form">
                <FormItem>
                    {getFieldDecorator('name', {
                        initialValue: data.name,
                        rules: [{ required: true, message: '请输入姓名!' }],
                    })(
                        <Input  placeholder="姓名" />
                    )}
                </FormItem>
                <FormItem>
                    {getFieldDecorator('age', {
                        initialValue: data.age,
                        rules: [{ required: true, message: '请输入年龄!' }],
                    })(
                        <Input placeholder="年龄" />
                    )}
                </FormItem>

                <FormItem>
                    {getFieldDecorator('address', {
                        initialValue: data.address,
                        rules: [{ required: true, message: '请输入住址!' }],
                    })(
                        <Input placeholder="住址" />
                    )}
                </FormItem>
            </Form>
        );
    }
}

const CreateFormWrapper = Form.create()(CreateForm);
