import admin from "firebase-admin";

const config = require("../../test-65bcf-firebase-adminsdk-253z8-eb531283c9.json");

admin.initializeApp({
  credential: admin.credential.cert(config)
});

export default admin;
