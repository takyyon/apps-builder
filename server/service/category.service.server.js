const dao = require('./../dao/category.dao.server');

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

deleteCategory = (id) => {
    return dao.deleteCategory(id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteCategory,
};