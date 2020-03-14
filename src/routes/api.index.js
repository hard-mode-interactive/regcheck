const { Router } = require('express');
const router = Router();
const { signup, login, perfil, refreshToken } = require('../controllers/auth.controller')
const { tokenVerification } = require('../middlewares/token.middleware');


router.post('/api/signup',signup);
router.post('/api/login',login);
router.get('/api/perfil',tokenVerification,perfil);
router.post('/api/refreshToken',refreshToken);


module.exports = router;