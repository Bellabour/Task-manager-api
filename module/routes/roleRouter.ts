import express from "express";
import routes from "../controllers/roleController";
import passport from "passport";
const router = express.Router();
const authpassport = passport.authenticate("jwt", {
  session: false,
});

router.post("/", authpassport, routes.createRole);
router.delete("/:id", authpassport, routes.deleteRole);
router.put("/:id", authpassport, routes.updateRole);
router.get("/", authpassport, routes.getRoles);
router.get("/:id", authpassport, routes.getRole);
router.post("/givePerm/:id", authpassport, routes.addPerm);
router.post("/removePerm/:id", authpassport, routes.removePerm);

module.exports = router;
