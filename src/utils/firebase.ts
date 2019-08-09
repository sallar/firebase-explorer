import admin from "firebase-admin";

const config = require("../../service-account.json");

admin.initializeApp({
  credential: admin.credential.cert(config)
});

export default admin;
