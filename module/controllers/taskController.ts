import passport from "passport";
import express from "express";
import expressAsyncHandler from "express-async-handler";
import taskService from "../services/taskService";
const router = express.Router();

const task= new taskService

const createTask = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await task.createTask(req,res);
  });
  const deleteTask = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await task.deleteTask(req, res);
  });
  const updatetask = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await task.updateTask(req, res);
  });
  const listTask = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await task.listTask(req, res);
  });
  const getTask = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await task.getTask(req, res);
  });
  const addStatus = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await task.addStatuses(req, res);
  });
  const addPriority = expressAsyncHandler(async (req: any, res: any) => {
    const admin = await task.addPriority(req, res);
  });

  export default{createTask,deleteTask,updatetask,listTask,getTask,addStatus,addPriority}