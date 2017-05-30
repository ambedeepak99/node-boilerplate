/**
 * @namespace routes.sample_route
 * @description initializing sample module routes.
 * @author deepak.ambekar [5/25/2017].
 */
var express = require('express');
var router = express.Router();

var SampleCtrl = require('../../app_modules/sample_module/sampleCtrl');

router.get('/getSampleRequest/:requestParam', SampleCtrl.getSampleRequest);
router.post('/postSampleRequest', SampleCtrl.postSampleRequest);

router.post('/insertData', SampleCtrl.insertData);
router.post('/selectData', SampleCtrl.selectData);
router.post('/updateData', SampleCtrl.updateData);
router.post('/deleteData', SampleCtrl.deleteData);

_logger.debug("sample_module route initialized");

module.exports = router;