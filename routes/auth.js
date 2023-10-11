const express = require('express');
const router = express.Router();

const rateLimiter = require('express-rate-limit');

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    msg: 'Too many requests from this IP, please try again after 15 minutes',
  },
});

const { register, login, } = require('../controllers/auth');
router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);

module.exports = router;
