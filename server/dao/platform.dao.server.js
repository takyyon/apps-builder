const model = require('./../model/platform.model.server');

findAll = () => {
    return model.
        find().
        populate('features').
        populate('apps');
}

findById = (id) => {
    return model.
        findById(id).
        populate('features').
        populate('apps');
}

create = (item) => {
    return model.create({
        name: item.name,
        description: item.description,
        icon: item.icon,
    });
}

update = (id, item) => {
    return model.update({_id: id}, {$set: {
        name: item.name,
        description: item.description,
        icon: item.icon
    }});
};

deletePlatform = (id) => {
    return model.deleteOne({_id: id});
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    deletePlatform,
};