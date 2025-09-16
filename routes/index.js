const router = require('express').Router();

router.use('/',
    // #swagger.ignore = true
    require('./swagger')
);
router.get('/', (req, res) => {
    // #swagger.tags = ['Health Check']
    res.send({ health: 'up' })
});
router.use('/contacts', require('./contacts'));

module.exports = router;