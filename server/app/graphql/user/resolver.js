'use strict';

module.exports = {
    Query: {
        user(root, { id }, ctx) {
            return ctx.connector.user.fetchById(id);
        },
    },
    Mutation: {
        createUser(root, {user_email}, ctx){
            return true;
        }
    }
};
