const router = require('express').Router();

router.get('/', (req, res) => { res.send({ health: 'up' }) });
router.use('/contacts', require('./contacts'));

module.exports = router;