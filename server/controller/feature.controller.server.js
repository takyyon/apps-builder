module.exports = function(app) {

    const service = require('./../service/feature.service.server');

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
            time: !!body.time? body.time: '',
            cost: !!body.cost? body.cost: '',
            icon: !!req.body.icon? body.icon: '',
            images: !!body.images? body.images: '',
            app: !!body.images? body.app: '',
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
            time: !!body.time? body.time: '',
            cost: !!body.cost? body.cost: '',
            icon: !!req.body.icon? body.icon: '',
            images: !!body.images? body.images: '',
            app: !!body.images? body.app: '',
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
        };
        service.
            assign(req.params.id, item)
            .then((app) => {
                res.json(200);
            });
    };

    deleteFeature = (req, res) => { 
        
        service.
        deleteFeature(req.params.id)
            .then((app) => {
                res.json(200);
            });
    };

    app.get('/api/feature/', findAll);
    app.get('/api/feature/:id/', findById);

    app.post('/api/feature/', create);
    app.put('/api/feature/:id/', update);
    app.put('/api/feature/:id/assign', assign);
    app.delete('/api/feature/:id/', deleteFeature);
};