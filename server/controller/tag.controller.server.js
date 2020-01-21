module.exports = function(app) {

    const service = require('./../service/tag.service.server');

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
            .then((tag) => {
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
            .then((tag) => {
                res.json(200);
            });
    };

    deleteTag = (req, res) => { 
        
        service.
        deleteTag(req.params.id)
            .then((tag) => {
                res.json(200);
            });
    };

    app.get('/api/tag/', findAll);
    app.get('/api/tag/:id/', findById);

    app.post('/api/tag/', create);
    app.put('/api/tag/:id/', update);
    app.delete('/api/tag/:id/', deleteTag);
};