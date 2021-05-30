'use strict';
require('dotenv').config();
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');
const routes = require('./middleware/router.middleware');

const app = new Koa();
routes.workOnRoutes(app);

app.use(bodyParser({
    enableTypes: ['text', 'json']
}));

module.exports = app.listen(52609, () =>
    console.log("Server is running in 52609 port !")
);

