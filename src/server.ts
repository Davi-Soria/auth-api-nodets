import  express  from "express";
import dotenv from 'dotenv';
import passport from "passport";
import router from "./routers";
import { mongoConnect } from "./dataBase/mongo";
import  path  from "path";


dotenv.config()

mongoConnect()

const server = express();
const PORT = process.env.PORT || 4000

server.use(express.json());
server.use(express.urlencoded({ extended: true }));
server.use(passport.initialize());
server.use("/uploads", express.static(path.join(__dirname, "uploads")));

server.use('/', router);

server.listen(PORT, () => {
    console.log('Servido rodando: http://localhost:4000')
})



