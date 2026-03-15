var router = require('express').Router();
router.get('/test', function(req,res){res.json({ok:true});});
module.exports = router;