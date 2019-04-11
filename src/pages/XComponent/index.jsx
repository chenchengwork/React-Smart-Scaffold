import React, { Fragment, useEffect } from 'react';
import { Card, Row, Col, Button, Icon } from 'antd';
import { MainHeader, MainContent} from "layouts/MainLayout";

import List from 'x-components/Virtual/List';

export default () => {
    return (
        <Fragment>
            <MainHeader title="x-components" />
            <MainContent>
                <Row>
                    <Col span={6}>
                        <Card
                            title="Card title"
                            bordered={false}
                            bodyStyle={{height: 300}}
                        >
                            <List />
                        </Card>
                    </Col>
                </Row>
            </MainContent>
        </Fragment>
    )
}



