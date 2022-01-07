const router = require("express").Router();
const { Post } = require("../../models/");
const signedInAuth = require("../../utils/signedInAuth");

router.post("/", signedInAuth, async (req, res) => {
  const template = req.body;

  try {
    const newPost = await Post.create({
      ...template,
      userId: req.session.userId,
    });
    res.json(newPost);
  } catch (err) {
    res.status(500).json(err);
  }
});

router.put("/:id", signedInAuth, async (req, res) => {
  try {
    const [updatedData] = await Post.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    if (updatedData > 0) {
      res.status(200).end();
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.delete("/:id", signedInAuth, async (req, res) => {
  try {
    const [deletedData] = Post.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedData > 0) {
      res.status(200).end();
    } else {
      res.status(500).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
