// bsecureAuth.js
const express = require("express");
const router = express.Router();
const bSecure = require("bsecure");  // Assuming 'bsecure' is the correct package
const config = require('../config/config'); 

router.post("/authorize", async (req, res) => {
  try {
    // Initialize bSecure with config
    const bsecureInstance = bSecure({
      client_id: config.client_id,
      client_secret: config.client_secret,
      environment: config.environment,
    });

    // Call the authorize method or the appropriate method for token retrieval
    const token = await bsecureInstance.authorize();  // Adjust based on actual method
    console.log(token);
    res.json({ token });
  } catch (error) {
    console.error("Authorization Error:", error);
    res.status(500).send("Authorization failed");
  }
});

module.exports = router;