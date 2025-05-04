"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_controller_1 = require("../controller/auth.controller");
const passport_1 = __importDefault(require("passport"));
const use_controller_1 = require("../controller/use.controller");
const auth_middleware_1 = require("../middleware/auth.middleware");
const multer_1 = require("../middleware/multer");
const router = express_1.default.Router();
router.get('/ping', (req, res) => {
    res.json({ res: 'pong' });
});
router.post('/register', auth_controller_1.register);
router.post('/login', auth_controller_1.login);
router.post("/avatar", auth_middleware_1.authenticate, multer_1.upload.single("avatar"), use_controller_1.uploadAvatar);
router.get('/protected', passport_1.default.authenticate('jwt', { session: false }), (req, res) => {
    res.json({ message: "Rota protegida acesada!!!" });
});
exports.default = router;
