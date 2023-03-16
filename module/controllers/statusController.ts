
import passport from "passport";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import statusService from "../services/statusServices";
const router = express.Router();

const status= new statusService


const createStatus = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await status.createStatus(req, res);
  });
  const deleteStatus = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await status.deleteStatus(req, res);
  });
  const updateStatus = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await status.updateStatus(req, res);
  });
  const listStatus = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await status.statusList(req, res);
  });

export default{createStatus,deleteStatus,updateStatus,listStatus}