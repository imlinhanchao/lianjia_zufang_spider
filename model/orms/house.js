const db = require("../db");

let orm = {
    id: {
        type: db.STRING(20),
        comment: "房子ID",
        primaryKey: true
    },
    name: {
        type: db.STRING(100),
        comment: "房源名称",
        allowNull: false
    }, 
    description: {
        type: db.STRING(500),
        comment: "房源描述",
        allowNull: true
    },
    area: {
        type: db.DECIMAL(10, 2),
        comment: "面积",
        allowNull: true
    },
    huxing: {
        type: db.STRING(100),
        comment: "户型",
        allowNull: true
    },
    floor: {
        type: db.STRING(100),
        comment: "楼层",
        allowNull: true
    },
    face: {
        type: db.STRING(50),
        comment: "朝向",
        allowNull: true
    },
    subway: {
        type: db.STRING(100),
        comment: "地铁",
        allowNull: true
    },
    community: {
        type: db.STRING(50),
        comment: "小区",
        allowNull: true
    },
    location: {
        type: db.STRING(100),
        comment: "位置",
        allowNull: true
    },
    postdate: {
        type: db.INTEGER,
        comment: "发布日",
        allowNull: true
    },
    housecode: {
        type: db.STRING(20),
        comment: "房源编码",
        allowNull: true
    },
    lianjiacode: {
        type: db.STRING(20),
        comment: "链家编码",
        allowNull: true
    },
    middleman: {
        type: db.STRING(50),
        comment: "经纪人",
        allowNull: true
    },
    score: {
        type: db.DECIMAL(5, 1),
        comment: "评分",
        allowNull: true
    },
    comment: {
        type: db.INTEGER,
        comment: "评论数",
        allowNull: true
    },
    looktimes: {
        type: db.INTEGER,
        comment: "看房次数",
        allowNull: true
    },
    phone: {
        type: db.STRING(50),
        comment: "经纪人电话",
        allowNull: true
    },
};

let table_name = "ml_lianjia_house";
module.exports = db.defineModel(table_name, orm, {
        comment: "链家房子表"
    }
);

module.exports.db = db;
module.exports.tb = table_name;
module.exports.keys = function () {
    return Object.keys(orm);
}