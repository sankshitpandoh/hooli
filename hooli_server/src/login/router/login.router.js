'use strict';
const Router = require('koa-router');
const document = require('../service/login.service');

const router = new Router({
    prefix: '/login'
});

router.post("/user", document.userLogin);
router.post("/super", document.superLogin);
router.post("/verify", document.verifySession);
// router.post("/logout", document.logOut);

module.exports =
    router;
