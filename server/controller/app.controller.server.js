module.exports = function(app) {

    const service = require('./../service/app.service.server');

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
            images: !!body.images? body.images: '',
        };
        service.
            create(item)
            .then((app) => {
                res.json(200);
            });
    };

    update = (req, res) => {
        const body = req.body;       
        const item = {
            name: !!body.name? body.name: '',
            description: !!body.description? body.description: '',
            images: !!body.images? body.images: '',
            icon: !!req.body.icon? body.icon: '',
        };
        service.
            update(req.params.id, item)
            .then((app) => {
                res.json(200);
            });
    };

    assign = (req, res) => {
        const body = req.body;       
        const item = {
            tags: !!body.tags? body.tags: '',
            categories: !!body.categories? body.categories: '',
            platforms: !!body.platforms? body.platforms: '',
            problems: !!body.problems? body.problems: '',
        };
        service.
            assign(req.params.id, item)
            .then((app) => {
                res.json(200);
            });
    };

    deleteApp = (req, res) => { 
        
        service.
            deleteApp(req.params.id)
            .then((app) => {
                res.json(200);
            });
    };

    app.get('/api/app/', findAll);
    app.get('/api/app/:id/', findById);

    app.post('/api/app/', create);
    app.put('/api/app/:id/', update);
    app.put('/api/app/:id/assign', assign);
    app.delete('/api/app/:id/', deleteApp);
};