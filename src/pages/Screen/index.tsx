import styles from './index.scss';
import * as React from 'react';
const { Fragment, useContext, useEffect } = React
import * as PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite';
import { Table, Button } from 'antd';
// import { FormattedMessage } from 'react-intl';

import prompt from '@/utils/prompt';
import { helper } from '@/utils/T';
import { MainContent, MainHeader } from '@/layouts/MainLayout'
import widthModal from '@/components/Hoc/widthModal';
import { StoreCtx } from '@/store';
import Create from './Create';

import { typeStore } from './models/TypeStore';

const Screen = observer(() => {
    const { createStore, listStore } = useContext(StoreCtx) as typeStore;

    useEffect(() => {
        listStore.fetchPageList();
    }, []);

    const columns = [
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
            render: (text: string, record: {id: string}) => (
                <Fragment>
                    <Button type="primary" icon="edit" onClick={() => renderCreateModal(record.id)}>编辑</Button>

                    <Button
                        type="danger"
                        icon="delete"
                        style={{marginLeft: 5}}
                        onClick={() => prompt.confirm(() => listStore.delItem(record.id))}
                    >删除</Button>
                </Fragment>
            )
        }
    ];

    const renderCreateModal = (screen_id?: string) => {
        const CreateModal = widthModal(Create);
        helper.mountReact(<CreateModal
            modalProps={{title: screen_id ? "编辑" :"创建"}}
            screen_id={screen_id}
            createStore={createStore}
            listStore={listStore}
        />)
    };

    const { data, loading } = listStore;

    return (
        <MainContent className={styles.screen}>
            <MainHeader title="可视化列表" rightRender={<Button icon="plus" onClick={() => renderCreateModal()}>创建</Button>}/>

            {/* 国际化调用 */}
            {/*<FormattedMessage*/}
            {/*id="Screen.test"*/}
            {/*defaultMessage={'你有条新信息'}*/}
            {/*values={{unreadCount: 10}}*/}
            {/*/>*/}

            <Table
                loading={loading}
                dataSource={data.rows}
                columns={columns}
                rowKey={(row) => row.name}
                pagination={{
                    total: data.count,
                    pageSize: 15
                }}
            />
        </MainContent>
    )
})

Screen.propTypes = {
    modalControl: PropTypes.object,
}

export default Screen;
