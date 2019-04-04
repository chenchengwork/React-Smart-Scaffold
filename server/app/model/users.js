const { getTableSchema, getTableName, getExtraParams, extendModel } = require("../model_schema/users");

module.exports = app => {
    const Users = app.model.define(
        getTableName(),
        getTableSchema(app.Sequelize),
        getExtraParams()
    );

    return extendModel(app.model, Users);
};
