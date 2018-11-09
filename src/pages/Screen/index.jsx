import React, { PureComponent } from 'react';
import {observer, inject} from 'mobx-react';
import { FormattedMessage } from 'react-intl';

import styles from './index.scss';
import { Table, Button } from 'antd';
import { helper } from 'utils/T';
import { MainContent, MainHeader } from 'layouts/MainLayout'
import widthModal from 'components/Hoc/widthModal';
import Create from './Create';


@inject((stores) => ({listStore: stores.screen.listStore}))
@observer
export default class Screen extends PureComponent{
    columns = [
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
        }
    ];

    componentDidMount(){
        this.props.listStore.fetchPageList();
    }

    renderCreateModal = () => {
        const CreateModal = widthModal(Create);
        helper.mountReact(<CreateModal modalProps={{title: "创建"}} />)
    }

    render(){
        const { data, loading } = this.props.listStore;

        return (
            <MainContent className={styles.screen}>
                <MainHeader title="可视化列表" rightRender={<Button icon="plus" onClick={this.renderCreateModal}>创建</Button>}/>

                {/* 国际化调用 */}
                {/*<FormattedMessage*/}
                    {/*id="Screen.test"*/}
                    {/*defaultMessage={'你有条新信息'}*/}
                    {/*values={{unreadCount: 10}}*/}
                {/*/>*/}

                <Table
                    loading={loading}
                    dataSource={data.rows}
                    columns={this.columns}
                    pagination={{
                        total: data.count,
                        pageSize: 15
                    }}
                />
            </MainContent>
        )
    }
}
