/**
 * 模型定义的额外参数
 * @param params
 * @return {*}
 */
exports.getModelExtraParams = (params = {}) => {

    return Object.assign({
        tableName: "",              // 表名称
        freezeTableName: true,      // 禁止修改表名
        underscored: false,         // 将自动设置所有属性的字段选项为下划线命名方式。不会覆盖已经定义的字段选项
        timestamps: true,           // 添加时间戳属性 (updatedAt, createdAt)
        paranoid: true,             // deletedAt 标识当前时间, 只有在timestamps启用时才生效
    }, params)
};

/**
 * 扩展模型方法
 * @param sequelize // sequelize连接实例
 * @param model     // orm 模型
 */
exports.extendModel = (sequelize, model) => {
    if(!sequelize) throw new Error("请传入db连接实例");
    if(!model) throw new Error("请传入db orm模型实例");

    // // 添加实例级别方法
    // model.prototype.instanceLevelMethod = function() {
    //     return 'bar';
    // };

    /**
     * 查询分页
     * @param page
     * @param pageSize
     * @param queryParams
     * @return {Promise<{rows: TInstance[]; count: number}> | *}
     */
    model.findPage = (page, pageSize, queryParams = {}) => {
        queryParams = Object.assign({
            limit: parseInt(pageSize),
            offset: (page - 1) * parseInt(pageSize),
        }, queryParams);

        return model.findAndCountAll(queryParams);
    };

    /**
     * 物理删除
     * @param queryParams
     * @return {*}
     */
    model.forceDestroy = (queryParams = {}) => {
        return model.destroy(Object.assign(queryParams, {force: true}));
    };

    /**
     * 整张表删除
     * @param queryParams
     * @return {*}
     */
    model.truncateTable = (queryParams = {}) => {
        return model.destroy(Object.assign(queryParams, {truncate: true}));
    };


    return model;
}
