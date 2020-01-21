const dao = require('./../dao/problem.dao.server');

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

deleteProblem = (id) => {
    return dao.deleteProblem(id);
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteProblem,
};