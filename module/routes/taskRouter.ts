import express from "express";
import routes from "../controllers/taskController";
import passport from "passport";
const router = express.Router();
const authpassport = passport.authenticate("jwt", {
  session: false,
});


router.post("/", authpassport, routes.createTask);
router.delete("/:id", authpassport, routes.deleteTask);
router.put("/:id", authpassport, routes.updatetask);
router.get("/", authpassport, routes.listTask);
router.get('/:id',authpassport,routes.getTask);
router.post('/status/:id',authpassport,routes.addStatus);
router.post('/priority/:id',authpassport,routes.addPriority);

module.exports=router