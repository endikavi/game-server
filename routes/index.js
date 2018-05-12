var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Servidor del juego' });
});

router.get('/game', function(req, res, next) {
  res.render('game', { title: 'cliente del juego' });
});

module.exports = router;
