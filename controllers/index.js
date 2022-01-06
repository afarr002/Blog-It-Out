const router = require("express").Router();

const apiRoutes = require("./api");
const homeRoutes = require("./home-routes");
const landingpageRoutes = require("./landingpage-routes");

router.use("/api", apiRoutes);
router.use("/", homeRoutes);
router.use("/landingpage", landingpageRoutes);

module.exports = router;
