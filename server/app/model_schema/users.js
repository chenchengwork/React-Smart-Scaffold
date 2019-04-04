const { getModelExtraParams, extendModel } = require("./lib");
const tableName = "users";

module.exports  = {
    extendModel: (sequelize, model) => extendModel(sequelize, model),

    getTableName: () => tableName,

    getExtraParams: (params = {}) => getModelExtraParams(Object.assign({tableName}, params)),

    getTableSchema: (Sequelize) => {
        const { STRING, INTEGER, DATE  } = Sequelize;

        return {
            id:{
                type: INTEGER,
                primaryKey: true,
                allowNull: false,
                autoIncrement: true
            },
            user_id: {
                type: STRING(64),
                unique: true,
            },
            account_id: {
                type: STRING(64),
            },
            user_name: {
                type: STRING(32),
                allowNull: false,
            },
            user_email: {
                type: STRING(32),
                unique: true,
                allowNull: false,
            },
            user_phone: {
                type: STRING(32),
                unique: true,
                allowNull: false,
            },
            password: {
                type: STRING(64),
            },
            user_status: {
                type: "tinyint",
                defaultValue: 1,
            },
            login_time: {
                type: DATE,
            },
            logout_time: {
                type: DATE,
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
    }
};

