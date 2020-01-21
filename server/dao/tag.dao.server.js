const model = require('./../model/tag.model.server');

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

deleteTag = (id) => {
    return model.deleteOne({_id: id});
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteTag,
};