const router = require("express").Router();
const { Post, Comment, User } = require("../models/");

router.get("/", async (req, res) => {
  try {
    const allPostData = await Post.findAll({
      include: [User],
    });

    const allPosts = allPostData.map((singlePost) =>
      singlePost.get({ plain: true })
    );

    res.render("all-posts", { allPosts });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/post/:id", async (req, res) => {
  try {
    const singlePostData = await Post.findByPk(req.params.id, {
      include: [
        User,
        {
          model: Comment,
          include: [User],
        },
      ],
    });

    if (singlePostData) {
      const singlePost = singlePostData.get({ plain: true });

      res.render("single-post", { singlePost });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/login", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("login");
});

router.get("/signup", (req, res) => {
  if (req.session.loggedIn) {
    res.redirect("/");
    return;
  }

  res.render("signup");
});

module.exports = router;
