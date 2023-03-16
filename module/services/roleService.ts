const express = require("express");
const router = express.Router();
const passport = require("passport");
const Helper = require("../../utils/helper");
const helper = new Helper();
const bodyParser = require("body-parser");

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

export default class roleService {
  //create role
  createRole = async function (req: any, res: any) {
    {
      helper
        .checkPermission(req.user.Roleid, "role_add")
        .then((rolePerm: any) => {
          if (!req.body.role_name || !req.body.role_description) {
            res.status(400).send({
              msg: "Please pass role_name and  role_description.",
            });
          } else {
            Role.create({
              role_name: req.body.role_name,
              role_description: req.body.role_description,
            })
              .then((role: any) => res.status(201).send(role))
              .catch((error: any) => {
                res.status(400).send({
                  success: false,
                  msg: error,
                });
              });
          }
        })
        .catch((error: any) => {
          res.status(403).send({
            success: false,
            msg: error,
          });
        });
    }
  };
  //delete role
  deleteRole = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "role_delete")
      .then((rolePerm: any) => {
        if (!req.params.id) {
          res.status(400).send({
            msg: "Please pass role ID.",
          });
        } else {
          Role.findByPk(req.params.id)
            .then((role: any) => {
              if (role) {
                Role.destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                  .then(() => {
                    res.status(200).send({
                      message: "Role deleted",
                    });
                  })
                  .catch((err: any) => res.status(400).send(err));
              } else {
                res.status(404).send({
                  message: "Role not found",
                });
              }
            })
            .catch((error: any) => {
              res.status(400).send({
                success: false,
                msg: error,
              });
            });
        }
      })
      .catch((error: any) => {
        res.status(403).send({
          success: false,
          msg: error,
        });
      });
  };
  //update a role
  updateRole = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "role_update")
      .then((rolePerm: any) => {
        if (
          !req.params.id ||
          !req.body.role_name ||
          !req.body.role_description
        ) {
          res.status(400).send({
            msg: "Please pass Role ID, name or description.",
          });
        } else {
          Role.findByPk(req.params.id)
            .then((role: any) => {
              Role.update(
                {
                  role_name: req.body.role_name || role.role_name,
                  role_description:
                    req.body.role_description || role.role_description,
                },
                {
                  where: {
                    id: req.params.id,
                  },
                }
              )
                .then(() => {
                  res.status(200).send({
                    message: "Role updated",
                  });
                })
                .catch((err: any) =>
                  res.status(400).send({
                    success: false,
                    msg: err,
                  })
                );
            })
            .catch((error: any) => {
              res.status(400).send({
                success: false,
                msg: error,
              });
            });
        }
      })
      .catch((error: any) => {
        res.status(403).send({
          success: false,
          msg: error,
        });
      });
  };
  listRole = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "role_get_all")
      .then((rolePerm: any) => {
        console.log(rolePerm);
        Role.findAll({
          include: [
            {
              model: Perm,
              attributes: ["id", "permission_name", "permission_description"],
            },
            {
              model: User,
              attributes: ["id", "Roleid", "Fullname"],
            },
          ],
        })
          .then((roles: any) => res.status(200).send(roles))
          .catch((error: any) => {
            res.status(400).send({
              success: false,
              msg: error.message,
            });
          });
      })
      .catch((error: any) => {
        res.status(403).send({
          success: false,
          msg: error,
        });
      });
  };
  Addperm = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "role_add_permission")
      .then(async (rolePerm: any) => {
        try {
          let cls = await Perm.findByPk(req.params.id, {});
          console.log(cls);
          let info = {
            role_name: req.body.Role_name,
          };
          const std = await Role.findOne({ where: info });
          console.log(std);
          cls.addRole(std);
          res.status(200).send("permission added succesfully");
        } catch (error: any) {
          res.status(400).json({ message: error.message });
        }
      });
  };

  getRole = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "role_get")
      .then(async (rolePerm: any) => {})
      .catch((error: any) => {
        res.status(403).send(error);
      });
    await Role.findByPk(req.params.id, {
      include: [
        {
          model: Perm,
          attributes: ["id", "permission_name"],
        },
        {
          model: User,
          attributes: ["id", "Fullname"],
        },
      ],
    })
      .then((roles: any) => res.status(200).send(roles))
      .catch((error: any) => {
        res.status(400).send({
          success: false,
          msg: error,
        });
      });
  };
  removePerm = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "role_remove_permission")
      .then(async (rolePerm: any) => {
        try {
          let cls = await Perm.findByPk(req.params.id, {});
          console.log(cls);
          let info = {
            Role_name: req.body.Role_name,
          };
          const std = await Role.findOne({ where: info });
          console.log(std);
          cls.removeRole(std);
          res.status(200).send("permission removed succesfully");
        } catch (error: any) {
          res.status(400).json({ message: error.message });
        }
      });
  };
}
