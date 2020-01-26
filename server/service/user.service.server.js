const dao = require('./../dao/user.dao.server');

login = (email, password) => {
    return dao.login(email, password);
};

register = (data) => {
    return dao.register(data);
};

module.exports = {
    login,
    register
};