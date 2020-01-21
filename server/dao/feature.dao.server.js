const model = require('./../model/feature.model.server');

findAll = () => {
    return model.
        find().
        populate('app').
        populate('platforms').
        populate('tags').
        populate('categories');
}

findById = (id) => {
    return model.
        findById(id).
        populate('app').
        populate('platforms').
        populate('tags').
        populate('categories');
}

create = (item) => {
    return model.create({
        name: item.name,
        description: item.description,
        time: item.time,
        cost: item.cost,
        icon: item.icon,
        images: item.images,
        app: item.app,
        platforms: [],
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
        app: item.app,
    }});
};

assign = (id, item) => {
    return model.update({_id: id}, {$set: {
        tags: item.tags,
        categories: item.categories,
        platforms: item.platforms,
    }});
};

deleteFeature = (id) => {
    return model.deleteOne({_id: id});
};

module.exports = {
    findAll,
    findById,
    create,
    update,
    deleteFeature,
    assign,
};