import express from "express";
import routes from "../controllers/permController";
import passport from "passport";
const router = express.Router();
const authpassport = passport.authenticate("jwt", {
  session: false,
});

router.post("/", authpassport, routes.createPerm);
router.delete("/:id", authpassport, routes.deletePerm);
router.put("/:id", authpassport, routes.updatePerm);
router.get("/", authpassport, routes.listPerm);

module.exports = router;
