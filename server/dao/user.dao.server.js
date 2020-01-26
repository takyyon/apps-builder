const userTypeModel = require('../model/userType.model.server');
const userModel = require('../model/user.model.server');

login = (email, password) => {
    return userModel.findOne({email, password}, 'name email icon userType');
};

register = (item) => {
    return userModel.create({
        name: item.name,
        email: item.email,
        password: item.password,
        icon: '',
    });
};

update = (id, name, icon) => {
    return userModel.update({_id: id}, {$set: {
        name: name,
        icon: icon,
    }});
};

findById = (id) => {
    return userModel.
        findById(id);
}

module.exports = {
    login,
    register,
    update,
    findById,
};