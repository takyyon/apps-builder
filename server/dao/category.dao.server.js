const model = require('./../model/category.model.server');

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
        features: [],
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

deleteCategory = (id) => {
    return model.deleteOne({_id: id});
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteCategory,
};