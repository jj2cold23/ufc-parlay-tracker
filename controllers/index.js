console.log(' Entered controllers/index.js');

const router = require('express').Router();
const authRoutes = require('./authController');
const parlayRoutes = require('./parlayController');

router.use('/', authRoutes);
router.use('/', parlayRoutes);

router.get('/', (req, res) => {
  res.render('home', { logged_in: req.session.logged_in });
});

module.exports = router;
