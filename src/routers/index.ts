import express from 'express';
import { login, register } from '../controller/auth.controller';
import passport from 'passport';
import { uploadAvatar } from '../controller/use.controller';
import { authenticate } from "../middleware/auth.middleware";
import { upload } from '../middleware/multer';


const router = express.Router();

router.get('/ping', (req, res) => {
    res.json({res: 'pong'})
});

router.post('/register', register);
router.post('/login', login);
router.post("/avatar", authenticate, upload.single("avatar"), uploadAvatar);

router.get('/protected', passport.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: "Rota protegida acesada!!!"});
});



export default router