import React, { Fragment, useContext } from 'react';
import { MainContent, MainHeader } from '@/layouts/MainLayout'
import { StoreCtx } from '@/store';
import { ListStoreType } from './model/ListStore';

import List from './List';
import DemoPagination from './DemoPagination';

const DemoList = ()=> {
    const listStore = useContext(StoreCtx).listStore as ListStoreType;

    return (
        <Fragment>
            <MainHeader title="demo列表" />
            <MainContent
                footerRender={<DemoPagination listStore={listStore} /> }
            >
                <List listStore={listStore} />
            </MainContent>
        </Fragment>
    )
}

export default DemoList;
