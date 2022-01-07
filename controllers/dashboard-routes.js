const router = require("express").Router();
const { Post } = require("../models/");
const signedInAuth = require("../utils/signedInAuth");

router.get("/", signedInAuth, async (req, res) => {
  try {
    const adminPostData = await Post.findAll({
      where: {
        userId: req.session.userId,
      },
    });

    const adminPosts = adminPostData.map((singlePost) =>
      singlePost.get({ plain: true })
    );

    res.render("all-posts-admin", {
      layout: "dashboard",
      adminPosts,
    });
  } catch (err) {
    res.redirect("login");
  }
});

router.get("/new", signedInAuth, (req, res) => {
  res.render("new-post", {
    layout: "dashboard",
  });
});

router.get("/edit/:id", signedInAuth, async (req, res) => {
  try {
    const singlePostData = await Post.findByPk(req.params.id);

    if (singlePostData) {
      const singlePost = singlePostData.get({ plain: true });

      res.render("edit-post", {
        layout: "dashboard",
        singlePost,
      });
    } else {
      res.status(404).end();
    }
  } catch (err) {
    res.redirect("login");
  }
});

module.exports = router;
