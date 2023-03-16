import AuthService from "../services/authService";
import passport from "passport";
import express from "express";
import expressAsyncHandler from "express-async-handler";
const router = express.Router();

const auth = new AuthService();

const createAdmin = expressAsyncHandler(async (req: any, res: any) => {
  const admin = await auth.createAdmin(req, res);
});
const givePermission = expressAsyncHandler(async (req: any, res: any) => {
  const perm = await auth.givePermission(req, res);
});
const signIn = expressAsyncHandler(async (req: any, res: any) => {
  const sign = await auth.signin(req, res);
});

export default { createAdmin, givePermission, signIn };
