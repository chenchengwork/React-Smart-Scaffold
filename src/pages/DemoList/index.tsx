import React, { Fragment, useContext, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { Table, Button } from 'antd';
import { DeleteOutlined } from '@ant-design/icons'
import { ColumnProps } from 'antd/lib/table'
import { RespDemoList } from '@/typings/api/response'
import { MainContent, MainHeader } from '@/layouts/MainLayout'
import { StoreCtx } from '@/store';
import { ListStoreType } from './model/ListStore';

const DemoList = ()=> {
    const listStore = useContext(StoreCtx).listStore as ListStoreType;

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
                    <Button
                        type="danger"
                        icon={<DeleteOutlined />}
                        style={{marginLeft: 5}}
                    >删除</Button>
                </Fragment>
            )
        }
    ];

    const { data, loading } = listStore;

    return (
        <Fragment>
            <MainHeader title="demo列表" />
            <MainContent>
                <Table
                    loading={loading}
                    dataSource={data.list}
                    columns={columns}
                    rowKey={(row) => row.name}
                    pagination={{
                        total: data.totalCount,
                        pageSize: data.pageSize
                    }}
                />
            </MainContent>
        </Fragment>
    )
}

export default observer(DemoList);
