const dao = require('./../dao/platform.dao.server');

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

deletePlatform = (id) => {
    return dao.deletePlatform(id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    deletePlatform,
};