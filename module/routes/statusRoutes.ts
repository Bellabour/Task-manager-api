import express from "express";
import routes from "../controllers/statusController";
import passport from "passport";
const router = express.Router();
const authpassport = passport.authenticate("jwt", {
  session: false,
});

router.post("/", authpassport, routes.createStatus);
router.delete("/:id", authpassport, routes.deleteStatus);
router.put("/:id", authpassport, routes.updateStatus);
router.get("/", authpassport, routes.listStatus);

module.exports=router