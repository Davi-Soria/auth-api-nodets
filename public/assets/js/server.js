"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const passport_1 = __importDefault(require("passport"));
const routers_1 = __importDefault(require("./routers"));
const mongo_1 = require("./dataBase/mongo");
const path_1 = __importDefault(require("path"));
dotenv_1.default.config();
(0, mongo_1.mongoConnect)();
const server = (0, express_1.default)();
const PORT = process.env.PORT || 4000;
server.use(express_1.default.json());
server.use(express_1.default.urlencoded({ extended: true }));
server.use(passport_1.default.initialize());
server.use("/uploads", express_1.default.static(path_1.default.join(__dirname, "../uploads")));
server.use('/', routers_1.default);
server.listen(PORT, () => {
    console.log('Servido rodando: http://localhost:4000');
});
