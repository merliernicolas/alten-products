const productRoutes = (app, fs) => {

    const data = './data/products.json';

    const readFile = (callback, returnJson = false, filePath = data, encoding = 'utf8') => {
        fs.readFile(filePath, encoding, (err, data) => {
            if (err) {
                throw err;
            }

            callback(returnJson ? JSON.parse(data) : data);
        });
    };

    const writeFile = (fileData, callback, filePath = data, encoding = 'utf8') => {

        fs.writeFile(filePath, fileData, encoding, (err) => {
            if (err) {
                throw err;
            }

            callback();
        });
    };

    app.get('/products', (req, res) => {
        fs.readFile(data, 'utf8', (err, data) => {
            if (err) {
                throw err;
            }

            res.send(JSON.parse(data));
        });
    });

    app.post('/products', (req, res) => {

        readFile(data => {
            const newProductId = Date.now().toString();

            data[newProductId.toString()] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send('nouveau produit !');
            });
        },
            true);
    });

    app.put('/products/:id', (req, res) => {

        readFile(data => {

            const productId = req.params["id"];
            data[productId] = req.body;

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`produit ${productId} mis à jour !`);
            });
        },
            true);
    });

    app.delete('/products/:id', (req, res) => {

        readFile(data => {

            const productId = req.params["id"];
            delete data[productId];

            writeFile(JSON.stringify(data, null, 2), () => {
                res.status(200).send(`produit ${productId} supprimé`);
            });
        },
            true);
    });
};

module.exports = productRoutes;