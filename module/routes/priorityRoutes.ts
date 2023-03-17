import express from "express";
import routes from "../controllers/priorityController";
import passport from "passport";
const router = express.Router();
const authpassport = passport.authenticate("jwt", {
  session: false,
});


router.post("/", authpassport, routes.createPriority);
router.delete("/:id", authpassport, routes.deletePriority);
router.put("/:id", authpassport, routes.updatePriority);
router.get("/", authpassport, routes.listSPriority);

module.exports=router