const model = require('../model/app.model.server');

findAll = () => {
    return model.
        find().
        populate('features').
        populate('platforms').
        populate('problems').
        populate('tags').
        populate('categories');
}

findById = (id) => {
    return model.
        findById(id).
        populate('features').
        populate('platforms').
        populate('problems').
        populate('tags').
        populate('categories');
}

create = (item) => {
    return model.create({
        name: item.name,
        description: item.description,
        icon: item.icon,
        images: item.images,
        platforms: [],
        problems: [],
        tags: [],
        categories: [],
    });
}

update = (id, item) => {
    return model.update({_id: id}, {$set: {
        name: item.name,
        description: item.description,
        icon: item.icon,
        images: item.images,
    }});
};

deleteApp = (id) => {
    return model.deleteOne({_id: id});
};

assign = (id, item) => {
    return model.update({_id: id}, {$set: {
        tags: item.tags,
        categories: item.categories,
        platforms: item.platforms,
        problems: item.problems,
    }});
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteApp,
    assign,
};