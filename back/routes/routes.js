const productRoutes = require('./products');

const Router = (app, fs) => {

    app.get('/', (req, res) => {
        res.send('welcome');
    });

    productRoutes(app, fs);

};

module.exports = Router;