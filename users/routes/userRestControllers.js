const express = require("express");
const { registerUser, getUser } = require("../models/userAccessDataService");
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    let user = await registerUser(req.body);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let user = await getUser(id);
    res.send(user);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

module.exports = router;
