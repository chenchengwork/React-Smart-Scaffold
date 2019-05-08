import { useEffect } from 'react';
import ApolloClient from "apollo-boost";
import gql from "graphql-tag";

/*

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
        <h2>test graphql</h2>
    )
}



