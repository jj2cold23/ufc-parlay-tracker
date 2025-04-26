console.log(' parlayController loaded');

const router = require('express').Router();
const { Parlay } = require('../models');
const withAuth = require('../utils/auth');

router.get('/dashboard', withAuth, async (req, res) => {
  const parlays = await Parlay.findAll({ where: { user_id: req.session.user_id } });
  const parlayData = parlays.map(p => p.get({ plain: true }));
  res.render('dashboard', { parlays: parlayData, logged_in: req.session.logged_in });
});

router.post('/parlay', withAuth, async (req, res) => {
  try {
    const newParlay = await Parlay.create({
      ...req.body,
      user_id: req.session.user_id,
    });
    res.status(200).json(newParlay);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/parlay/delete/:id', withAuth, async (req, res) => {
  try {
    await Parlay.destroy({ where: { id: req.params.id, user_id: req.session.user_id } });
    res.redirect('/dashboard');
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
