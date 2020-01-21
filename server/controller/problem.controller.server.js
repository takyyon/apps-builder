module.exports = function(app) {

    const service = require('./../service/problem.service.server');

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
            .then((problem) => {
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
            .then((problem) => {
                res.json(200);
            });
    };

    deleteProblem = (req, res) => { 
        
        service.
        deleteProblem(req.params.id)
            .then((problem) => {
                res.json(200);
            });
    };

    app.get('/api/problem/', findAll);
    app.get('/api/problem/:id/', findById);

    app.post('/api/problem/', create);
    app.put('/api/problem/:id/', update);
    app.delete('/api/problem/:id/', deleteProblem);
};