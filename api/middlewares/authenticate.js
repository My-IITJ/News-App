// Firenase admin
var admin = require("firebase-admin");

const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  next();
};


exports.checkIfAuthenticated = (req, res, next) => {
 getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      req.authId = userInfo.uid;
      return next();
    } catch (e) {
      console.log(e);
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
};

exports.checkIfAdmin = (req, res, next) => {
  getAuthToken(req, res, async () => {
    try {
      const { authToken } = req;
      const userInfo = await admin
        .auth()
        .verifyIdToken(authToken);
      req.authId = userInfo.uid;
      console.log(userInfo)
      if (userInfo.role === 'faculty') {
        return next();
      } else {
        return res
          .status(401)
          .send({ error: 'You are not authorized to make this request' });
      }
    } catch (e) {
      console.log(e);
      return res
        .status(401)
        .send({ error: 'You are not authorized to make this request' });
    }
  });
}