import express from 'express';
import { login, register } from '../controller/auth.controller';
import passport from 'passport';

const router = express.Router();

router.get('/ping', (req, res) => {
    res.json({res: 'pong'})
});

router.post('/register', register);
router.post('/login', login);
router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: "Rota protegida acesada!!!"});
});


export default router