// Firenase admin
var admin = require("firebase-admin");

var serviceAccount = require("./myiitj-firebase-adminsdk-wzehf-e400c245a7.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

exports.admin