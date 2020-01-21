const dao = require('./../dao/tag.dao.server');

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

deleteTag = (id) => {
    return dao.deleteTag(id);
};

module.exports = {
    findAll,
    findById,
    create,
    create,
    update,
    deleteTag,
};