const { getModelExtraParams, extendModel } = require("./lib");
const tableName = "screens";

module.exports  = {
    extendModel: (sequelize, model) => extendModel(sequelize, model),

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
            screen_id: {
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
            cover: {
                type: STRING(255)
            },
            config: {
                type: TEXT("long"),
            },
            share: {
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
    }
};

