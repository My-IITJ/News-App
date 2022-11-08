// Firenase admin
var admin = require("firebase-admin");

var serviceAccount =JSON.parse(
  process.env.FIREBASE_SERVICE_ACCOUNT_KEY as string
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.admin