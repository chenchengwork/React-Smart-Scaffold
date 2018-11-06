import {prompt, helper} from 'utils/T';
import CreateDsModal from './CreateDsModal';

import { MainContent, MainHeader } from 'layouts/MainLayout'
import React, { Component, Fragment } from 'react';
import {observer} from 'mobx-react';

import { Table, Button } from 'antd';
const pageSize = 10;

@observer
export default class DataSource extends Component{
    columns = [
        {
            title: '名称',
            dataIndex: 'name',
        },
        {
            title: '类型',
            dataIndex: 'type',
        },
        {
            title: '创建时间',
            dataIndex: 'createdAt',
        },
        {
            title: '操作',
            render: (record) => (
                <Fragment>
                    <Button icon="edit" type="primary" onClick={() => this.renderDsModel(record.data_source_id)}>编辑</Button>
                    <Button style={{marginLeft: 5}} icon="delete" type="danger" onClick={() => this.delDs(record.data_source_id)}>删除</Button>
                </Fragment>
            )
        },
    ];

    componentDidMount(){
        this.getDsList();
    }

    getDsList = (page = 1, pageSize = pageSize) => this.props.store.fetchDsList(page, pageSize);

    delDs = (data_source_id) => prompt.confirm(() => this.props.store.delDs(data_source_id));

    renderDsModel = (data_source_id = null) => {
        const { createDsStore } = this.props.store;
        helper.mountReact(<CreateDsModal
            data_source_id={data_source_id}
            store={createDsStore}
            getDsList={this.getDsList}
        />);
    };

    render(){
        const { store } = this.props;
        const { loading, data } = store;

        return (
            <MainContent>
                <MainHeader title="数据源列表" rightRender={
                    <Fragment>
                        <Button style={{marginLeft: 5}} icon="plus" type="primary" onClick={() => this.renderDsModel()}>创建</Button>
                    </Fragment>
                }/>

                <Table
                    columns={this.columns}
                    dataSource={data.rows}
                    loading={loading}
                    rowKey={(record) => record.data_source_id}
                    pagination={{
                        total: data.count,
                        pageSize,
                        onChange: (page) => this.getDsList(page)
                    }}
                />

            </MainContent>
        )
    }
}

