const db = require("../db");

let orm = {
    uuid: {
        type: db.UUID,
        defaultValue: db.UUIDV4,
        primaryKey: true
    },
    id: {
        type: db.STRING(20),
        comment: "房子ID",
    },
    price: {
        type: db.INTEGER,
        comment: "房子租价"
    }, 
};

let table_name = "ml_lianjia_price";
module.exports = db.defineModel(table_name, orm, {
        comment: "链家价格表"
    }
);

module.exports.db = db;
module.exports.tb = table_name;
module.exports.keys = function () {
    return Object.keys(orm);
}