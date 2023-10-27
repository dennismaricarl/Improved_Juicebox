const express = require('express');
const usersRouter = express.Router();

const { PrismaClient } = require('.prisma/client');
const prisma = new PrismaClient();

const JWT = process.env.JWT; 
const jwt = require('jsonwebtoken');

const bcrypt = require('bcrypt');
const SALT_COUNT = 10;



// <---------------------GET, REGISTER, LOGIN USER------------------------------->

//Get users
usersRouter.get('/', async (req, res, next) => {
    try{
        const users = await prisma.users.findMany();
        res.send(users)
    }catch(error){
        next(error)
    }
})

//Register new user
usersRouter.post('/register', async (req, res, next) => {
    try{
        const { username, password, name, location } = req.body;
        const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
        const user = prisma.user.create({
            data: {
                username,
                password: hashedPassword,
                name,
                location
            }
        })

        delete user.password
       
     
        //generate a token for new user 
        const token = jwt.sign({id: user.id}, JWT)
        
        res.status(201).send({user, message:'thanks for signing up', token})


    }catch(error){
        next(error)
    }
})

//Log in existing user 
usersRouter.post('/login', async (req, res, next) => {
    try {
        const {username, password} = req.body

        const user = await prisma.user.findUnique({
            where: {
                username,
            }
        })
        
    //if user doesn't exist 
        if(!user){
            res.status(401).send({message: 'User not found!'})
        }

        //verify password 
        const isPasswordValid = await bcrypt.compare(password, user.password)

        if(!password) {
            res.status(401).send({message: 'Invalid password'})
        }
    //generate a token for logged in user 
        const token = jwt.sign({
            user:user.id},
            JWT) 

        res.status(201).send({student, token})

    }catch(error) {
        next(error)
    }
})


module.exports = usersRouter;