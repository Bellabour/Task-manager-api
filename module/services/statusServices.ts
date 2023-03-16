const express = require('express');
const router = express.Router();
const passport = require('passport');
const Helper = require("../../utils/helper");
const helper = new Helper();
const bodyParser=require ('body-parser')
const jwt = require('jsonwebtoken');
require('../../config/passport')(passport);


import db from '../../models/index'
const Role=db.Role
const User=db.Users
const Task=db.Tasks
const Perm=db.Permission
const Status=db.Statuses
const Priority=db.Priorities
const Usertasks=db.User_tasks
const RolePermissions=db.Role_Permission



export default class statusService{
    createStatus=async function(req:any, res:any) {
        helper.checkPermission(req.user.Roleid, 'status_add').then((_rolePerm: any) => {
            if (req.body.status_name == "") {
          return res.status(422).json({ message: "status_name cannot be empty" });
        } else if (!req.body.status_name) {
          return res
            .status(412)
            .json({ message: "status_name should be spelt correctly" });
        }
        let info = {
            Status_name: req.body.status_name,
        };
        console.log(info)
        if (info)
          try {
             Status.create(info);
            res.status(200).json({ message: "Status added successfully!" });
          } catch (error:any) {
            return res
              .status(400)
              .json({ message: error.message || "we just got an error" });
    }})};
   deleteStatus=async function (req:any, res:any) {
        helper.checkPermission(req.user.Roleid, 'status_delete').then((_rolePerm:any) => {
            if (!req.params.id) {
                res.status(400).send({
                    msg: 'Please pass permission ID.'
                })
            } else {
                Status
                    .findByPk(req.params.id)
                    .then((status:any) => {
                        if (status) {
                            status.destroy({
                                where: {
                                    id: req.params.id
                                }
                            }).then(()=> {
                                res.status(200).send({
                                    'message': 'status deleted'
                                });
                            }).catch((err: any) => res.status(400).send(err));
                        } else {
                            res.status(404).send({
                                'message': 'status not found'
                            });
                        }
                    })
                    .catch((error: any) => {
                        res.status(400).send(error);
                    });
            }
        }).catch((error:any) => {
            res.status(403).send(error);
        });
    };
    updateStatus=async function (req:any, res:any) {
        helper.checkPermission(req.user.Roleid, 'status_update').then((_rolePerm:any) => {
            if (!req.params.id || !req.body.status_name ) {
                res.status(400).send({
                    msg: 'Please pass status ID, and name.'
                })
            } else {
                Status
                    .findByPk(req.params.id)
                    .then((status:any) => {
                        status.update({
                            Status_name: req.body.status_name || status.Status_name,
                        }, {
                            where: {
                                id: req.params.id
                            }
                        }).then(() => {
                            res.status(200).send({
                                'message': 'status updated'
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
statusList=async function (req:any, res:any) {
        helper.checkPermission(req.user.Roleid, 'status_get_all').then((_rolePerm:any) => {
            Status
                .findAll()
                .then((status:any) => res.status(200).send(status))
                .catch((error: any) => {
                    res.status(400).send(error);
                });
        }).catch((error:any) => {
            res.status(403).send(error);
        });
    };
    
}