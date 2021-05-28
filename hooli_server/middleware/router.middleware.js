'use strict';
const Router = require('koa-router');
const recursive = require("recursive-readdir");

const apiRouter = new Router({
    prefix: '/api'
});

let workOnRoutes = async (app) => {
    try {
        let nestedRoutes = await recursive('src/', ["*.model.js", "*.service.js"]);
        if (nestedRoutes) {
            for (let i in nestedRoutes) {
                console.log(nestedRoutes[i]);
                apiRouter.use(require("./../" + nestedRoutes[i]).routes(), require("./../" + nestedRoutes[i]).allowedMethods());
            }
        }
        app.use(apiRouter.routes(), apiRouter.allowedMethods());
    } catch (err) {
        console.error(`Error occured in route`, err);
    }
}

module.exports = {
    workOnRoutes
}