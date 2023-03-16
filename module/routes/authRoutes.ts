import express from "express";
import routes from "../controllers/authController";
import passport from "passport";
const router = express.Router();
const authpassport = passport.authenticate("jwt", {
  session: false,
});

router.post("/", routes.createAdmin);
router.post("/perm/:id", routes.givePermission);
router.post("/signin", routes.signIn);

module.exports = router;
