// Firenase admin
var admin = require("firebase-admin");
var serviceAccount = require("../myiitj-firebase-adminsdk-wzehf-75b7416a30.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});


const getAuthToken = (req, res, next) => {
  if (
    req.headers.authorization &&
    req.headers.authorization.split(' ')[0] === 'Bearer'
  ) {
    req.authToken = req.headers.authorization.split(' ')[1];
  } else {
    req.authToken = null;
  }
  console.log(req.authToken);
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