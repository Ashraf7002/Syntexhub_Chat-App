const router = require("express").Router();
const Conversation = require("../models/Conversation");

// create conversation
router.post("/", async (req, res) => {
  try {
    const { senderId, receiverId } = req.body;

    const existing = await Conversation.findOne({
      members: { $all: [senderId, receiverId] },
    });

    if (existing) return res.json(existing);

    const newConv = new Conversation({
      members: [senderId, receiverId],
    });

    const saved = await newConv.save();
    res.json(saved);

  } catch (err) {
    res.status(500).json(err);
  }
});

// get user conversations
router.get("/:userId", async (req, res) => {
  try {
    const convs = await Conversation.find({
      members: { $in: [req.params.userId] },
    }).populate("members", "name email");

    res.json(convs);

  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;