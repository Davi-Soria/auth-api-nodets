import { Strategy as JwtStrategy, ExtractJwt, StrategyOptionsWithRequest, StrategyOptions } from "passport-jwt";
import passport from "passport";
import dotenv from 'dotenv';
import User from "../model.schema/User";


dotenv.config();

const options = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET as string
};

passport.use( new JwtStrategy(options, async (payload, done) => {
    try{
        const user = await User.findById(payload.id);
        if(user) {
            return done(null, user);
        } else {
            return done(null, false);
        }
    } catch (err) {
        return done(err, false);
    }
} ))