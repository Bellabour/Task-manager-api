const express = require("express");
const router = express.Router();
const passport = require("passport");
const Helper = require("../../utils/helper");
const helper = new Helper();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");
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

export default class userService {
  createUser = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "user_add")
      .then((_rolePerm: any) => {
        if (
          !req.body.role_id ||
          !req.body.email ||
          !req.body.password ||
          !req.body.fullname
        ) {
          res.status(400).send({
            msg: "Please pass role_id, email, password, fullname.",
          });
        } else {
          User.create({
            Email: req.body.email,
            Password: req.body.password,
            Fullname: req.body.fullname,
            Roleid: req.body.role_id,
          })
            .then((user: any) => res.status(201).send(user))
            .catch((error: any) => {
              console.log(error);
              res.status(400).send(error);
            });
        }
      })
      .catch((error: any) => {
        res.status(403).send(error.message);
      });
  };
  deleteUser = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "user_delete")
      .then((rolePerm: any) => {
        if (!req.params.id) {
          res.status(400).send({
            msg: "Please pass user ID.",
          });
        } else {
          User.findByPk(req.params.id)
            .then((user: any) => {
              if (user) {
                User.destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                  .then(() => {
                    res.status(200).send({
                      message: "User deleted",
                    });
                  })
                  .catch((err: any) => res.status(400).send(err));
              } else {
                res.status(404).send({
                  message: "User not found",
                });
              }
            })
            .catch((error: any) => {
              res.status(400).send(error);
            });
        }
      })
      .catch((error: any) => {
        res.status(403).send(error);
      });
  };
  updateUser = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "role_update")
      .then((rolePerm: any) => {
        if (
          !req.body.role_id ||
          !req.body.email ||
          !req.body.fullname 
        ) {
          res.status(400).send({
            msg: "Please pass Role ID, email, password, phone or fullname.",
          });
        } else {
          User.findByPk(req.params.id)
            .then(
              (user: {
                Email: any;
                Fullname: any;
                Roleid: any;
              }) => {
                User.update(
                  {
                    email: req.body.email || user.Email,
                    fullname: req.body.fullname || user.Fullname,
                    Roleid: req.body.role_id || user.Roleid,
                  },
                  {
                    where: {
                      id: req.params.id,
                    },
                  }
                )
                  .then((_: any) => {
                    res.status(200).send({
                      message: "User updated",
                    });
                  })
                  .catch((err: any) => res.status(400).send(err));
              }
            )
            .catch((error: any) => {
              res.status(400).send(error);
            });
        }
      })
      .catch((error: any) => {
        res.status(403).send(error);
      });
  };
  listUsers = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "user_get_all")
      .then((rolePerm: any) => {
        User.findAll({
          include: [
            {
              model: Role,
              include: [
                {
                  model: Perm,
                },
              ],
            },
          ],
        })
          .then((users: any) => res.status(200).send(users))
          .catch((error: any) => {
            res.status(400).send(error.message);
          });
      })
      .catch((error: any) => {
        res.status(403).send(error);
      });
  };
  listUser = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "user_get")
      .then((rolePerm: any) => {
        User.findByPk(req.params.id)
          .then((user: any) => res.status(200).send(user))
          .catch((error: any) => {
            res.status(400).send(error);
          });
      })
      .catch((error: any) => {
        res.status(403).send(error);
      });
  };
}
