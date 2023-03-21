import express from "express";
import routes from "../controllers/userController";
import passport from "passport";
const router = express.Router();
const authpassport = passport.authenticate("jwt", {
  session: false,
});


router.post("/", authpassport, routes.createUser);
router.delete("/:id", authpassport, routes.deleteUser);
router.put("/:id", authpassport, routes.updateUser);
router.get("/", authpassport, routes.listUsers);
router.get('/:id',authpassport,routes.listUser)
router.post('/task/:id',authpassport,routes.addTask)

module.exports=router