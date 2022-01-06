const router = require("express").Router();
const { Comment } = require("../../models");

router.post("/", async (req, res) => {
  const template = req.body;

  try {
    const addComment = await Comment.create({
      ...template,
      userId: req.session.userId,
    });
    res.json(addComment);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
