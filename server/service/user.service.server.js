const dao = require('./../dao/user.dao.server');

login = (email, password) => {
    return dao.login(email, password);
};

register = (data) => {
    return dao.register(data);
};
update = (id, name, icon) => {
    return dao.update(id, name, icon);
};
findById = (id) => {
    return dao.findUser(id);
};

module.exports = {
    login,
    register,
    update,
    findById,
};