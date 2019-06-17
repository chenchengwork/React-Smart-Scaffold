import * as React from 'react';
import * as PropTypes from 'prop-types';
const { Component, useEffect, useState } = React;
import { observer } from 'mobx-react-lite';
import { Form, Input } from 'antd';
import Box from '@/components/Box';
import {WrappedComponentProps} from '@/components/Hoc/widthModal';
import { FormComponentProps } from 'antd/lib/form'
const FormItem = Form.Item;

const Create = observer(({modalControl, screen_id, createStore, listStore}: WrappedComponentProps) => {
    const [ form, setForm ] = useState(null);
    useEffect(() => {
        modalControl.registerOk(handleSubmit);
    });

    useEffect(() => {
        createStore.fetchData(screen_id);
    }, []);

    const handleSubmit = () => {
        form && form.validateFields((err: Error, values: any) => {
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


interface CreateFormProps extends FormComponentProps{
    data: {
        name: string;
        age: string|number;
        address: string;
    };
    loading: boolean;
    setForm: (form: any) => void
}
class CreateForm extends Component<CreateFormProps> {
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

const CreateFormWrapper = Form.create<CreateFormProps>()(CreateForm);
