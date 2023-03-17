const passport = require("passport");
const Helper = require("../../utils/helper");
const helper = new Helper();
const bodyParser = require("body-parser");
import express from 'express'
require("../../config/passport")(passport);

import db from "../../models/index";
const Role = db.Role;
const User = db.Users;
const Task = db.Tasks;
const Perm = db.Permission;
const Status = db.Statuses;
const Priority = db.Priorities;
const Usertasks = db.User_tasks;

export default class priorityService{
createPriority=async function(req:any,res:any){
    helper.checkPermission(req.user.Roleid, 'priority_add').then((_rolePerm:any) => {
        if (req.body.priority_name == "") {
      return res.status(422).json({ message: "priority_name cannot be empty" });
    } else if (!req.body.priority_name) {
      return res
        .status(412)
        .json({ message: "priority_name should be spelt correctly" });
    }
    let info = {
        Priority_name: req.body.priority_name,
    };
    console.log(info)
    if (info)
      try {
         Priority.create(info);
        res.status(200).json({ message: "Priority added successfully!" });
      } catch (error:any) {
        return res
          .status(400)
          .json({ message: error.message || "we just got an error" });
}})};
deletePriority=async function(req:any,res:any){
    helper.checkPermission(req.user.Roleid, 'priority_delete').then((rolePerm:any) => {
        if (!req.params.id) {
            res.status(400).send({
                msg: 'Please pass priority ID.'
            })
        } else {
            Priority
                .findByPk(req.params.id)
                .then((priority:any) => {
                    if (priority) {
                        priority.destroy({
                            where: {
                                id: req.params.id
                            }
                        }).then(() => {
                            res.status(200).send({
                                'message': 'priority deleted'
                            });
                        }).catch((err: any) => res.status(400).send(err));
                    } else {
                        res.status(404).send({
                            'message': 'priority not found'
                        });
                    }
                })
                .catch((error: any) => {
                    res.status(400).send(error);
                });
        }
    }).catch((error: any) => {
        res.status(403).send(error);
    });
};
updatePriority=async function(req:any,res:any){
    helper.checkPermission(req.user.Roleid, 'priority_update').then((rolePerm:any) => {
        if (!req.params.id || !req.body.priority_name ) {
            res.status(400).send({
                msg: 'Please pass priority ID, and priority_name.'
            })
        } else {
            Priority
                .findByPk(req.params.id)
                .then((priority:any) => {
                    priority.update({
                        Priority_name: req.body.priority_name || priority.Priority_name,
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(() => {
                        res.status(200).send({
                            'message': 'priority updated'
                        });
                    }).catch((err: any) => res.status(400).send(err));
                })
                .catch((error: { message: any; }) => {
                    res.status(400).send(error.message);
                });
        }
    }).catch((error: any) => {
        res.status(403).send(error);
    });
};
listPriorities=async function(req:any,res:any){
    helper.checkPermission(req.user.Roleid, 'priority_get_all').then((rolePerm:any) => {
        Priority
            .findAll()
            .then((priority:any) => res.status(200).send(priority))
            .catch((error:any) => {
                res.status(400).send(error);
            });
    }).catch((error:any) => {
        res.status(403).send(error);
    });
};
}






