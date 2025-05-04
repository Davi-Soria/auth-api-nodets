import passport from "../middleware/passport.config";

export const authenticate = passport.authenticate('jwt', { session: false })
