const router = require("express").Router();

const apiRoutes = require("./api/");
const homeRoutes = require("./home-routes.js");
const landingpageRoutes = require("./landingpage-routes.js");

router.use("/", homeRoutes);
router.use("/landingpage", landingpageRoutes);
router.use("/api", apiRoutes);

module.exports = router;
