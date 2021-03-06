const router = require("express").Router();
const { User } = require("../../models/");

router.post("/", async (req, res) => {
  // console.log(req.body);
  try {
    const newUser = await User.create({
      username: req.body.username,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.userId = newUser.id;
      req.session.username = newUser.username;
      req.session.loggedIn = true;

      res.json(newUser);
    });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/login", async (req, res) => {
  try {
    const dbUserData = await User.findOne({
      where: {
        username: req.body.username,
      },
    });

    console.log(dbUserData);

    if (!dbUserData.username) {
      res.status(400).json({
        message: `No account found for that username!
        Please try again!`,
      });
      return;
    }

    const validPassword = await dbUserData.checkPassword(req.body.password);

    if (!validPassword) {
      res.status(400).json({
        message: `Password does not match for that username!
        Please try again!`,
      });
      return;
    }

    req.session.save(() => {
      req.session.userId = dbUserData.id;
      req.session.username = dbUserData.username;
      req.session.loggedIn = true;

      res.json({
        dbUserData,
        message: `You are now logged in!
      Blog on!`,
      });
    });
  } catch (err) {
    res.status(400).json({ message: "No user account found" });
  }
});

router.post("/logout", (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
