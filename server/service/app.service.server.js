const dao = require('./../dao/app.dao.server');

findAll = () => {
    return dao.findAll();
};

findById = (id) => {
    return dao.findById(id);
};

create = (item) => {
    return dao.create(item);
};

update = (id, item) => {
    return dao.update(id, item);
};

deleteApp = (id) => {
    return dao.deleteApp(id);
};

assign = (id, item) => {
    return dao.assign(id, item);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteApp,
    assign,
};