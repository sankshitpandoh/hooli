'use strict';
const Koa = require('koa');
const bodyParser = require('koa-bodyparser');

const app = new Koa();

app.use(bodyParser({
    enableTypes: ['text', 'json']
}));

module.exports = app.listen(52609, () =>
    console.log("Server is running in 52609 port !")
);

