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
        const body = authData;
        const data = {
            name: !!body.name? body.name: '',
            email: !!body.email? body.email: '',
            password: !!body.password? body.password: '',
        };
        service.
            register(data)
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

    update = (req, res) => {
        jwt.verify(req.token, constants.jsonSecret, (err, authData) => {
            if(err){
                res.sendStatus(403);
            }else {
                const body = req.body;
                const name = !!body.name? body.name: '';
                const icon = !!body.icon? body.icon: '';
                
                service.
                    update(authData.user, name, icon)
                    .then((res1) => {
                        if(res1['n'] != 1) {
                            res.sendStatus(500);
                        }else {
                            service.findById(authData.user).then((user) => {
                                res.json(user);
                            });
                        }
                    });
            }
        });
    }

    app.post('/api/login/', login);
    app.put('/api/login/', constants.verifyToken, update)
    app.post('/api/register/', register);
};