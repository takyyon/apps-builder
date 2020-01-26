module.exports = function(app) {

    const service = require('./../service/user.service.server');
    const constants = require('./../assets/constants')();
    const jwt = require('jsonwebtoken');

    login = (req, res) => {
        const body = req.body;
        const email = !!body.email? body.email: '';
        const password = !!body.password? body.password: '';
        service.
            login(email, password)
            .then((user) => {
                if(user) {
                    jwt.sign({
                        user: user._id,
                    }, constants.jsonSecret, (err, token) => {
                        res.json({token, user: {...user._doc}})
                    });
                }else {
                    res.json(200);
                }
            });
    };

    register = (req, res) => {
        const body = req.body;
        const data = {
            name: !!body.name? body.name: '',
            email: !!body.email? body.email: '',
            password: !!body.password? body.password: '',
        };
        
        service.
            register(data)
            .then((user) => {
                res.json(user);
            });
    }

    app.post('/api/login/', login);
    app.post('/api/register/', register);
};