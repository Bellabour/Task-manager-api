import express from 'express';
import bodyParser from 'body-parser'
import db from './models'
import sequelize from 'sequelize'
import cookieParser from 'cookie-parser'
db.sequelize == sequelize;
import passport from 'passport'


const app=express();
const port= process.env.PORT||4000

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(passport.initialize());

app.use('/auth',require('./module/routes/authRoutes'))
app.use('/auth/permission',require('./module/routes/permRoutes'))
app.use('/auth/role',require('./module/routes/roleRouter'))
app.use('/auth/status',require('./module/routes/statusRoutes'))

//var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/userRoutes');
// var rolesRouter = require('./routes/roleRouter');
// var permsRouter = require('./routes/permissionRouter');
// var taskRouter= require ('./routes/taskRouter');
// var authRouter = require('./routes/authRouter');
// var statusRouter=require('./routes/statusRouter');
// var priorityRouter=require('./routes/priorityRouter')



// app.use('/api/v1/auth', authRouter);
// app.use('/api/v1/task',taskRouter)
// app.use('/api/v1/users', usersRouter);
// app.use('/api/v1/roles', rolesRouter);
// app.use('/api/v1/status',statusRouter);
// app.use('/api/v1/permission', permsRouter);
// app.use('/api/v1/priority',priorityRouter)


app.use(bodyParser.urlencoded({extended:true}))
app.use(bodyParser.json())

app.listen(port,()=>console.log(`Listening on port ${port}`));