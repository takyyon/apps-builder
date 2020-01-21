module.exports = function(app) {

    const service = require('./../service/category.service.server');

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
            .then((category) => {
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
            .then((category) => {
                res.json(200);
            });
    };

    deleteCategory = (req, res) => { 
        
        service.
            deleteCategory(req.params.id)
            .then((category) => {
                res.json(200);
            });
    };

    app.get('/api/category/', findAll);
    app.get('/api/category/:id/', findById);

    app.post('/api/category/', create);
    app.put('/api/category/:id/', update);
    app.delete('/api/category/:id/', deleteCategory);
};