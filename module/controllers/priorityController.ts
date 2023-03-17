import passport from "passport";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import priorityService from "../services/priorityService";
const router = express.Router();

const priority=new priorityService

const createPriority = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await priority.createPriority(req,res);
  });
  const deletePriority = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await priority.deletePriority(req, res);
  });
  const updatePriority = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await priority.updatePriority(req, res);
  });
  const listSPriority= expressAsyncHandler(async (req: any, res: any) => {
    const admin = await priority.listPriorities(req, res);
  });

  export default{createPriority,deletePriority,updatePriority,listSPriority}