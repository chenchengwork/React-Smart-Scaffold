import { Fragment, useEffect } from 'react';
// import { Card, Row, Col, Button, Icon } from 'antd';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import { MainHeader, MainContent} from "layouts/MainLayout";

/*
    Hooks的使用有两个原则：
        1. 不要在循环，条件判断，函数嵌套中使用hooks
        2. 只能在函数组件中使用hooks
 */
export default () => {

    useEffect(() => {
        const client = new ApolloClient({
            uri: "http://localhost:8002/graphql"
        });

        client.query({
            query: gql`
              {
                user(id: 1) {
                  id
                }
              }
            `
        })
        .then(resp => console.log(resp), err => console.log(err));

    }, []);

    return (
        <Fragment>
            <MainHeader title="Graphql" />
            <MainContent>

            </MainContent>
        </Fragment>
    )
}



