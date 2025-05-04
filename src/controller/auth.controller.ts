import { RequestHandler } from "express";
import User from "../model.schema/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const register: RequestHandler = async (req, res) => {
    const { name, email, password, age, avatar } = req.body;

    if(!email || !name || !password ) {
        res.status(400).json({ message: "Campos obrigatórios faltando!!!"})
        return
    };

    const existingUser = await User.findOne({ email });
    if(existingUser) {
        res.status(409).json({ message: "Usuário já existe!!" });
        return
    };

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new User({
        name,
        email,
        password: hashedPassword,
        age,
        avatar
    });

    await newUser.save();
    res.status(201).json({ newUser })
  
};

export const login: RequestHandler = async (req, res) => {
    const { email, password } = req.body;
    const user = await User.findOne({ email });
   
    if(!user) {
        res.status(404).json({ message: "Usuário não encontrado"});
        return
    }

    const isMatch = await bcrypt.compare(password, user.password);
    
    
    if(!isMatch) {
        res.status(401).json({ message: "Senha incorreta!!"});
        return
    }


    const token = jwt.sign({ id: user._id },
        process.env.JWT_SECRET as string,{
        expiresIn: "1d"
    });

    res.json({ message: "Login bem sucedido!!", token})
}
