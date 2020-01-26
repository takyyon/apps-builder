module.exports = () => {
    const mongodbString = 'mongodb://heroku_zr1wsjd0:r79jrqu1m8ghu9sq82sso5b5ot@ds141937.mlab.com:41937/heroku_zr1wsjd0';
    const jsonSecret = 'D4MP<TWN<tb~vw7X';
    verifyToken = (req, res, next) => {
        const authHeader = req.headers['authorization'];
        if(typeof authHeader !== 'undefined') {
            const bearer = authHeader.split(' ');
            const bearerToken = bearer[1];
            req.token = bearerToken;
            next();
        }else {
            res.sendStatus(403);
        }
    }
    return {
        mongodbString,
        jsonSecret,
        verifyToken,
    }
};