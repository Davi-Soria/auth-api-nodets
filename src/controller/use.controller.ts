import sharp from "sharp";
import path from "path";
import fs from "fs";
import User from "../model.schema/User";
import { RequestHandler } from "express";


export const uploadAvatar: RequestHandler = async (req, res) => {
    if(!req.user || !req.file) {
        res.status(400).json({ message: "Nenhum usuário ou arquivo enviado!!!" })
        return 
    }

    try {
        const userId = (req.user as any).id;

        const fileName = `${userId}-${Date.now()}.jpeg`;
        const uploadDir = path.resolve(__dirname, "../../uploads/avatars");
        
        fs.mkdirSync(uploadDir, { recursive: true })

        const filePath = path.join(uploadDir, fileName);

        await sharp(req.file.buffer)
        .resize(300, 300)
        .jpeg({ quality: 90 })
        .toFile(filePath)

        const user = await User.findByIdAndUpdate(
            userId,
            { avatar: `/uploads/avatars/${fileName}` },
            { new: true }
        );

        res.status(200).json({
            message: "Avatar atualizado com sucesso!!",
            avatar: user?.avatar,
    })} catch( error ) {
        res.status(500).json({ message: "Erro ao salvar avatar!!"})
    }
}