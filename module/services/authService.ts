const express = require("express");
const router = express.Router();
const passport = require("passport");
const Helper = require("../../utils/helper");
const helper = new Helper();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
import {Request,Response}from 'express'
require("../../config/passport")(passport);

import db from "../../models/index";
const Role = db.Role;
const User = db.Users;
const Task = db.Tasks;
const Perm = db.Permission;
const Status = db.Statuses;
const Priority = db.Priorities;
const Usertasks = db.User_tasks;
const RolePermissions = db.Role_Permission;

export default class AuthService {
  createAdmin = async function (req: Request, res: Response) {
    if (!req.body.Email || !req.body.Password || !req.body.Fullname) {
      res.status(400).send({
        msg: "Please pass Email, Password and Fullname.",
      });
    } else {
      await Role.findOne({
        where: {
          role_name: "admin",
        },
      })
        .then((role: any) => {
          console.log(role.id);
          User.create({
            Email: req.body.Email,
            Password: req.body.Password,
            Fullname: req.body.Fullname,
            Roleid: role.id,
          })
            .then((user: any) => res.status(201).send(user))
            .catch((error: any) => {
              res.status(400).send(error);
            });
        })
        .catch((error: any) => {
          res.status(400).send(error);
        });
    }
  };
  givePermission = async function (req: Request, res: Response) {
    try {
      let cls = await Perm.findByPk(req.params.id, {});
      console.log(cls);
      let info = {
        Role_name: req.body.Role_name,
      };
      let std = await Role.findOne({ where: info });
      console.log(std);
      await cls.addRole(std);
      res.status(200).send("permission added succesfully");
    } catch (error: any) {
      res.status(400).json({ message: error.message });
    }
  };

  signin = async function (req: any, res: any) {
    User.findOne({
      where: {
        Email: req.body.Email,
      },
    })
      .then((user: any) => {
        if (!user) {
          return res.status(401).send({
            message: "Authentication failed. User not found.",
          });
        }
        user.comparePassword(req.body.Password, (err: any, isMatch: any) => {
          console.log(req.body.password);
          if (isMatch && !err) {
            var token = jwt.sign(
              JSON.parse(JSON.stringify(user)),
              "nodeauthsecret",
              {
                expiresIn: 86400 * 30,
              }
            );
            jwt.verify(token, "nodeauthsecret", function (err: any, data: any) {
              console.log(err, data);
            });
            res.json({
              success: true,
              token: "JWT " + token,
            });
          } else {
            res.status(401).send({
              success: false,
              msg: "Authentication failed. Wrong password.",
            });
          }
        });
      })
      .catch((error: { message: any }) => res.status(400).send(error.message));
  };
}
