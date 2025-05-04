"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const passport_config_1 = __importDefault(require("../middleware/passport.config"));
exports.authenticate = passport_config_1.default.authenticate('jwt', { session: false });
