const passportJWT = require('passport-jwt');
const ExtractJwt = passportJWT.ExtractJwt;
const JwtStrategy = passportJWT.Strategy;

const jwtOptions = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: 'your_jwt_secret'
};

module.exports = passport => {
    passport.use(
        new JwtStrategy(jwtOptions, (jwtPayload, done) => {
            // 检查数据库中是否存在用户(为了方便，写死123)
            if (jwtPayload.id === 123) {
                done(null, { id: 123,role: 'admin'})
            } else {
                done(null, false);
            }
        })
    );
};
