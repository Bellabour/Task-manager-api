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


export default class taskService{
createTask=async function(req:any,res:any){
    helper
      .checkPermission(req.user.Roleid, "task_add")
      .then((rolePerm: any) => {
        if (
          !req.body.Task_name ||
          !req.body.Task_description ||
          !req.body.Due_date
        ) {
          res.status(400).send({
            msg: "Please pass Task_name, Task_description, and Due_date.",
          });
        } else {
          Task.create({
            Task_name: req.body.Task_name,
            Task_description: req.body.Task_description,
            Due_date: req.body.Due_date,
          })
            .then((task: any) => res.status(201).send(task))
            .catch((error: any) => {
              console.log(error);
              res.status(400).send(error);
            });
        }
      })
      .catch((error: { message: any; }) => {
        res.status(403).send(error.message);
      });
  }
deleteTask=async function(req:any,res:any){helper.checkPermission(req.user.Roleid, 'task_delete').then((rolePerm: any) => {
    if (!req.params.id) {
        res.status(400).send({
            msg: 'Please pass product ID.'
        })
    } else {
        Task
            .findByPk(req.params.id)
            .then((task: any) => {
                if (task) {
                    Task.destroy({
                        where: {
                            id: req.params.id
                        }
                    }).then(() => {
                        res.status(200).send({
                            'message': 'Task deleted'
                        });
                    }).catch((err: any) => res.status(400).send(err));
                } else {
                    res.status(404).send({
                        'message': 'Task not found'
                    });
                }
            })
            .catch((error: any) => {
                res.status(400).send(error);
            });
    }
}).catch((error: any) => {
    res.status(403).send(error.message);
});}
updateTask=async function(req:any,res:any){
    helper.checkPermission(req.user.Roleid, 'task_update').then((rolePerm: any) => {
        if (!req.body.Task_name || !req.body.Task_description || !req.body.Due_date ) {
            res.status(400).send({
                msg: 'Please pass Task_name,Task_description, Due_date.'
            })
        } else {
            Task
                .findByPk(req.params.id)
                .then((task: any) => {
                    Task.update({
                        Task_name: req.body.Task_name || Task.Task_name,
                        Task_description: req.body.Task_description || Task.Task_description,
                        Due_date: req.body.Due_date || Task.Due_date,
                    }, {
                        where: {
                            id: req.params.id
                        }
                    }).then(() => {  
                        res.status(200).send({
                            'message': 'Task updated'
                        });
                    }).catch((err: any) => res.status(400).send(err));
                })
                .catch((error: any) => {
                    res.status(400).send(error);
                });
        }
    }).catch((error: any) => {
        res.status(403).send(error);
    });
  };
listTask=async function(req:any,res:any){  helper
    .checkPermission(req.user.Roleid, "task_get_all")
    .then((rolePerm: any) => {
      Task.findAll()
        .then((task: any) => res.status(200).send(task))
        .catch((error: any) => {
          res.status(400).send(error);
        });
    })
    .catch((error: any) => {
      res.status(403).send(error);
    });};
getTask=async function(req:any,res:any){   
        helper
          .checkPermission(req.user.Roleid, "task_get")
          .then((rolePerm: any) => {
            Task.findByPk(req.params.id)
              .then((task: any) => res.status(200).send(task))
              .catch((error: any) => {
                res.status(400).send(error);
              });
          })
          .catch((error: any) => {
            res.status(403).send(error);
          });
      };
addStatuses=async function(req:any,res:any){
    helper.checkPermission(req.user.Roleid, "task_addStatus").then(async(rolePerm: any) => {
        if (req.body.Status_name == "") {
          return res.status(422).json({ message: "Status_name cannot be empty" });
        } else if (!req.body.Status_name) {
          return res
            .status(412)
            .json({ message: "Status_name should be spelt correctly" });
        }
        try {
          let std = await Task.findByPk(req.params.id, {});
          let info = {
            Status_name: req.body.Status_name,
          };
          let crs = await Status.findOne({ where: info });
          if (crs) {
          } else
            return res.status(400).send({ message: "Status could not be found" });
          await std.setStatus(crs);
          return res.status(200).send("Status added succesfully");
        } catch (error:any) {
          return res.status(400).json({ message: error.message });
        }
      });
    };
addPriority=async function(req:any,res:any){
    helper.checkPermission(req.user.Roleid, "task_addPriority").then(async(rolePerm: any) => {
        if (req.body.Priority_name == "") {
          return res.status(422).json({ message: "Priority_name cannot be empty" });
        } else if (!req.body.Priority_name) {
          return res
            .status(412)
            .json({ message: "Priority_name should be spelt correctly" });
        }
        try {
          let std = await Task.findByPk(req.params.id, {});
          let info = {
            Priority_name: req.body.Priority_name,
          };
          let crs = await Priority.findOne({ where: info });
          if (crs) {
          } else
            return res.status(400).send({ message: "Priority could not be found" });
          await std.setPriority(crs);
          return res.status(200).send("Priority added succesfully");
        } catch (error:any) {
          return res.status(400).json({ message: error.message });
        }
      });
    };
}







