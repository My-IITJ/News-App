// Firenase admin
var admin = require("firebase-admin");

var serviceAccount = require("./myiitj-firebase-adminsdk-wzehf-75b7416a30.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.admin