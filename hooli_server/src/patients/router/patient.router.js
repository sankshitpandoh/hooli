'use strict';
const Router = require('koa-router');
const document = require('../service/patient.service');

const router = new Router({
    prefix: '/patients'
});

router.post("/uploadBulk", document.uploadBulk);
router.post("/uploadSingle", document.singleUpload);
router.post("/getPatients", document.getPatients);
router.post("/deletePatient", document.deletePatient);

module.exports =
    router;
