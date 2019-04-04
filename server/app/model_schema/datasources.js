const { getModelExtraParams, extendModel } = require("./lib");
const tableName = "datasources";

module.exports  = {
    getTableName: () => tableName,

    getExtraParams: (params = {}) => getModelExtraParams(Object.assign({tableName}, params)),

    getTableSchema: (Sequelize) => {
        const { STRING, INTEGER, TEXT, DATE  } = Sequelize;

        return {
            id:{
                type: INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            data_source_id: {
                type: STRING(64),
                unique: true,
            },
            account_id: {
                type: STRING(64),
                allowNull: false,
            },
            user_id: {
                type: STRING(64),
                allowNull: false,
            },
            name: {
                type: STRING(32),
                allowNull: false,
            },
            type: {
                type: STRING(32),
                allowNull: false,
            },
            config: {
                type: TEXT,
            },
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

    extendModel: (sequelize, model) => extendModel(sequelize, model),
};

