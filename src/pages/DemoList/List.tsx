import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import Sk_Button from "@/components/sk_antd/Sk_Button";
import Sk_Table, { ColumnProps } from "@/components/sk_antd/Sk_Table";
import { DeleteOutlined } from '@ant-design/icons'
import { RespDemoList } from '@/typings/api/response'
import { ListStoreType } from './model/ListStore';

interface ListProps {
    listStore: ListStoreType;
}

const List: React.FC<ListProps> = ({listStore})=> {
    useEffect(() => {
        listStore.fetchPageList();
    }, []);

    const columns: ColumnProps<RespDemoList.DemoItem>[] = [
        {
            title: '姓名',
            dataIndex: 'name',
        },
        {
            title: '年龄',
            dataIndex: 'age',
        },
        {
            title: '住址',
            dataIndex: 'address',
        },
        {
            title: "操作",
            render: (text: string, record) => (
                <Fragment>
                    <Sk_Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        style={{marginLeft: 5}}
                    >删除</Sk_Button>
                </Fragment>
            )
        }
    ];

    const { data, loading } = listStore;

    return (
        <Sk_Table
            loading={loading}
            dataSource={data.list}
            columns={columns}
            rowKey={(row) => row.name}
            pagination={false}
        />
    )
}

export default observer(List);
