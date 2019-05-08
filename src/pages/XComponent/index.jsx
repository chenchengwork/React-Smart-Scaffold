import React, { Fragment, useState } from 'react';
import { Card, Button } from 'antd';
import { MainHeader, MainContent} from "layouts/MainLayout";
import loadable from 'utils/loadable';

const components = [
    {
        label: "ReactHooks",
        Com: loadable(import("./ReactHooks"))
    },
    {
        label: "graphql",
        Com: loadable(import('x-components/Graphql'))
    },
    {
        label: "大数据量列表(Virtual-list)",
        Com: loadable(import("x-components/Virtual/List"))
    },
];

export default () => {
    const [activeComIdx, setActiveComIdx] = useState(0);
    const ActiveCom = components[activeComIdx].Com;
    const ActiveLabel = components[activeComIdx].label;

    return (
        <Fragment>
            <MainHeader title="x-components" />
            <MainContent>
                <Button.Group>
                    {
                        components.map(({label}, idx) => (
                            <Button
                                key={idx}
                                onClick={() => setActiveComIdx(idx)}
                                type={activeComIdx === idx ? "primary" : "default"}
                            >{label}</Button>
                        ))
                    }
                </Button.Group>

                <Card
                    title={ActiveLabel}
                    bordered={false}
                    style={{marginTop: 10}}
                    bodyStyle={{maxHeight: 450, overflow: "auto"}}
                >
                    <ActiveCom />
                </Card>
            </MainContent>
        </Fragment>
    )
}



