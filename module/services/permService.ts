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

export default class permService {
  //create a new permission
  createPerm = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "permissions_add")
      .then((rolePerm: any) => {
        if (!req.body.perm_name || !req.body.perm_description) {
          res.status(400).send({
            msg: "Please pass perm_name name or perm_description.",
          });
        } else {
          Perm.create({
            permission_name: req.body.perm_name,
            permission_description: req.body.perm_description,
          })
            .then((perm: any) => res.status(201).send(perm))
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
  // Delete a permission
  deletePerm = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "permission_delete")
      .then((rolePerm: any) => {
        if (!req.params.id) {
          res.status(400).send({
            msg: "Please pass permission ID.",
          });
        } else {
          Perm.findByPk(req.params.id)
            .then((perm: any) => {
              if (perm) {
                Perm.destroy({
                  where: {
                    id: req.params.id,
                  },
                })
                  .then(() => {
                    res.status(200).send({
                      message: "permission deleted",
                    });
                  })
                  .catch((err: any) => res.status(400).send(err));
              } else {
                res.status(404).send({
                  message: "permission not found",
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

  // Update a permission
  updatePerm = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "permissions_update")
      .then((rolePerm: any) => {
        if (
          !req.params.id ||
          !req.body.perm_name ||
          !req.body.perm_description
        ) {
          res.status(400).send({
            msg: "Please pass permission ID, name or description.",
          });
        } else {
          Perm.findByPk(req.params.id)
            .then((perm: any) => {
              perm
                .update(
                  {
                    permission_name: req.body.perm_name || perm.perm_name,
                    permission_description:
                      req.body.perm_description || perm.perm_description,
                  },
                  {
                    where: {
                      id: req.params.id,
                    },
                  }
                )
                .then(() => {
                  res.status(200).send({
                    message: "permission updated",
                  });
                })
                .catch((err: any) => res.status(400).send(err.message));
            })
            .catch((error: any) => {
              res.status(400).send(error.message);
            });
        }
      })
      .catch((error: any) => {
        res.status(403).send(error);
      });
  };
  // Get List of permissions
  listPerm = async function (req: any, res: any) {
    helper
      .checkPermission(req.user.Roleid, "permissions_get_all")
      .then((rolePerm: any) => {
        Perm.findAll()
          .then((perms: any) => res.status(200).send(perms))
          .catch((error: any) => {
            res.status(400).send(error.message);
          });
      })
      .catch((error: any) => {
        res.status(403).send(error.message);
      });
  };
}
