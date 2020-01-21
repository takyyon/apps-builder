module.exports = function(app) {

    const service = require('./../service/platform.service.server');

    findAll = (req, res) => {
        service.
            findAll().
            then((apps) => res.json(apps));
    };

    findById = (req, res) => {
        const id = req.params.id;
        service.
            findById(id).
            then((app) => res.json(app));
    };

    create = (req, res) => {
        const body = req.body;
        const item = {
            name: !!body.name? body.name: '',
            description: !!body.description? body.description: '',
            icon: !!req.body.icon? body.icon: '',
        };
        service.
            create(item)
            .then((platform) => {
                res.json(200);
            });
    };

    update = (req, res) => {
        const body = req.body;       
        const item = {
            name: !!body.name? body.name: '',
            description: !!body.description? body.description: '',
            icon: !!req.body.icon? body.icon: '',
        };
        service.
            update(req.params.id, item)
            .then((platform) => {
                res.json(200);
            });
    };

    deletePlatform = (req, res) => { 
        
        service.
        deletePlatform(req.params.id)
            .then((platform) => {
                res.json(200);
            });
    };

    app.get('/api/platform/', findAll);
    app.get('/api/platform/:id/', findById);

    app.post('/api/platform/', create);
    app.put('/api/platform/:id/', update);
    app.delete('/api/platform/:id/', deletePlatform);
};