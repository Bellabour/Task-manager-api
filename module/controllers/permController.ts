import permService from "../services/permService";
import passport from "passport";
import express from "express";
import expressAsyncHandler from "express-async-handler";
const router = express.Router();

const perm = new permService();

const createPerm = expressAsyncHandler(async (req: any, res: any) => {
  const admin = await perm.createPerm(req, res);
});
const deletePerm = expressAsyncHandler(async (req: any, res: any) => {
  const admin = await perm.deletePerm(req, res);
});
const updatePerm = expressAsyncHandler(async (req: any, res: any) => {
  const admin = await perm.updatePerm(req, res);
});
const listPerm = expressAsyncHandler(async (req: any, res: any) => {
  const admin = await perm.listPerm(req, res);
});

export default { createPerm, deletePerm, updatePerm, listPerm };
