const model = require('./../model/problem.model.server');

findAll = () => {
    return model.
        find().
        populate('apps');
}

findById = (id) => {
    return model.
        findById(id).
        populate('apps');
}

create = (item) => {
    return model.create({
        name: item.name,
        description: item.description,
        icon: item.icon,
        apps: [],
    });
}

update = (id, item) => {
    return model.update({_id: id}, {$set: {
        name: item.name,
        description: item.description,
        icon: item.icon
    }});
};

deleteProblem = (id) => {
    return model.deleteOne({_id: id});
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteProblem,
};