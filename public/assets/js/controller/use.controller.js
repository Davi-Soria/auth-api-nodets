"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.uploadAvatar = void 0;
const sharp_1 = __importDefault(require("sharp"));
const path_1 = __importDefault(require("path"));
const fs_1 = __importDefault(require("fs"));
const User_1 = __importDefault(require("../model.schema/User"));
const uploadAvatar = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.user || !req.file) {
        res.status(400).json({ message: "Nenhum usuário ou arquivo enviado!!!" });
        return;
    }
    try {
        const userId = req.user.id;
        const fileName = `${userId}-${Date.now()}.jpeg`;
        const uploadDir = path_1.default.resolve(__dirname, "../../uploads/avatars");
        if (!fs_1.default.existsSync(uploadDir)) {
            fs_1.default.mkdirSync(uploadDir, { recursive: true });
        }
        const filePath = path_1.default.join(uploadDir, fileName);
        yield (0, sharp_1.default)(req.file.buffer)
            .resize(300, 300)
            .jpeg({ quality: 90 })
            .toFile(filePath);
        const user = yield User_1.default.findByIdAndUpdate(userId, { avatar: `/uploads/avatars/${fileName}` }, { new: true });
        res.status(200).json({
            message: "Avatar atualizado com sucesso!!",
            avatar: user === null || user === void 0 ? void 0 : user.avatar,
        });
    }
    catch (error) {
        res.status(500).json({ message: "Erro ao salvar avatar!!" });
    }
});
exports.uploadAvatar = uploadAvatar;
