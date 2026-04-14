const express = require("express");
const router = express.Router();
const Message = require("../models/Message");

// ✅ Send Message
router.post("/send", async (req, res) => {
  try {
    const { senderId, receiverId, text } = req.body;

    const message = new Message({
      senderId,
      receiverId,
      text,
    });

    const saved = await message.save();

    res.json(saved);

  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ Get Messages between users
router.get("/:user1/:user2", async (req, res) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: req.params.user1, receiverId: req.params.user2 },
        { senderId: req.params.user2, receiverId: req.params.user1 },
      ],
    }).sort({ createdAt: 1 });

    res.json(messages);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;