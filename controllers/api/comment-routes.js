const router = require("express").Router();
const { Comment } = require("../../models");
const signedInAuth = require("../../utils/signedInAuth");

router.post("/", signedInAuth, async (req, res) => {
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
