const { getModelExtraParams, extendModel } = require("./lib");
const tableName = "accounts";

module.exports  = {
    extendModel: (sequelize, model) => extendModel(sequelize, model),

    getTableName: () => tableName,

    getExtraParams: (params = {}) => getModelExtraParams(Object.assign({tableName}, params)),

    getTableSchema: (Sequelize) => {
        const { STRING, INTEGER, DATE } = Sequelize;

        return {
            id:{
                type: INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            account_id: {
                type: STRING(64),
                unique: true,
            },
            name: STRING(32),
            description: STRING(255),
            deletedAt: DATE,
            createdAt: {
                type : DATE,
                allowNull : false,
            },
            updatedAt: {
                type : DATE,
                allowNull : false,
            },
        }
    },
};
