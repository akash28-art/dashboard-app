const express = require("express");
const router = express.Router();
const User = require("../models/User");
const auth = require("../middleware/authMiddleware");

router.get("/", auth, async (req, res) => {
  const users = await User.find();
  res.json(users);
});

router.post("/", auth, async (req, res) => {
  const user = new User(req.body);
  await user.save();
  res.json(user);
});

router.put("/:id", auth, async (req, res) => {
  const updated = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
  res.json(updated);
});

router.delete("/:id", auth, async (req, res) => {
  await User.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;