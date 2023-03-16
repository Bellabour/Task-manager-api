import roleService from "../services//roleService";
import passport from "passport";
import express from "express";
import expressAsyncHandler from "express-async-handler";
const router = express.Router();

const role = new roleService();

const createRole = expressAsyncHandler(async (req: any, res: any) => {
  const admin = await role.createRole(req, res);
});
const deleteRole = expressAsyncHandler(async (req: any, res: any) => {
  const admin = await role.deleteRole(req, res);
});
const updateRole = expressAsyncHandler(async (req: any, res: any) => {
  const admin = await role.updateRole(req, res);
});
const getRoles = expressAsyncHandler(async (req: any, res: any) => {
  const admin = await role.listRole(req, res);
});
const getRole = expressAsyncHandler(async (req: any, res: any) => {
  const admin = await role.getRole(req, res);
});
const addPerm = expressAsyncHandler(async (req: any, res: any) => {
  const admin = await role.Addperm(req, res);
});
const removePerm = expressAsyncHandler(async (req: any, res: any) => {
  const admin = await role.removePerm(req, res);
});

export default {
  createRole,
  deleteRole,
  updateRole,
  getRole,
  getRoles,
  addPerm,
  removePerm,
};
