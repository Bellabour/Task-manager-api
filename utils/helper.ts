
import db from '../models'
const Permission = db.Permission
const RolePermission=db.Role_Permission

class Helper {
    constructor() {}

    checkPermission(roleId: any, permName: any) {
        return new Promise(
            (resolve, reject) => {
                Permission.findOne({
                    where: {
                        permission_name: permName
                    }
                }).then((perm:any) => {
                    RolePermission.findOne({
                        where: {
                            Roleid: roleId,
                            Permissionid: perm.id
                        }
                    }).then((rolePermission:any) => {
                        if(rolePermission) {
                            resolve(rolePermission);
                        } else {
                            reject({message: 'Forbidden'});
                        }
                        console.log(rolePermission)
                    }).catch((error: any) => {
                        reject(error);
                    });

                }).catch(() => {
                    reject({message: 'Forbidden'});
                });
            }
        );
    }
}


module.exports = Helper;