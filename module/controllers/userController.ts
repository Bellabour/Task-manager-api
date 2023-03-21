import passport from "passport";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import statusService from "../services/statusServices";
import userService from "../services/userService";
const router = express.Router();

const user = new userService


const createUser = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await user.createUser(req,res);
  });
  const deleteUser = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await user.deleteUser(req, res);
  });
  const updateUser = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await user.updateUser(req, res);
  });
  const listUsers = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await user.listUsers(req, res);
  });
  const listUser = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await user.listUser(req, res);
  });
  const addTask=expressAsyncHandler(async(req:any,res:any)=>{
    const admin = await user.addUserTask(req,res)
  });
  export default{createUser,deleteUser,updateUser,listUser,listUsers,addTask}