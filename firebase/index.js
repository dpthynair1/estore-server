
var admin = require("firebase-admin");

//var serviceAccount = require("../config/fbServiceAccountKey.json");//
var serviceAccount = require("/etc/secrets/fbServiceAccountKey.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://estore-a7e65.firebaseio.com"
});


module.exports = admin;
