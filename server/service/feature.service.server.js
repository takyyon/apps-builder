const dao = require('./../dao/feature.dao.server');

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

deleteFeature = (id) => {
    return dao.deleteFeature(id);
};

assign = (id, item) => {
    return dao.assign(id, item);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteFeature,
    assign,
};