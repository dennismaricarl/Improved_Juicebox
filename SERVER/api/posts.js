const express = require('express');
const postsRouter = express.Router();

const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();


// <-------------getAll, getbyId create, update, delete posts-------->

//Get all posts
//GET request
postsRouter.get('/', async (req, res, next) => {
    try{
      const post = await prisma.post.findMany()
      res.send(post)
    }catch(error){
      next(error)
    }
})


//Create a new post 
postsRouter.post('/', async (req, res, next) => {
  try{ 
    const {title, content, tags} = req.body
    const post = await prisma.post.create({
      data: {
          authorId: req.user.id,
          title,
          content,
          tags
      }
    })
    if(post) {
      res.send(post)
    }
    if(!post) {
      res.send({name: error, message:'there was an error creating your post'})
    }

  }catch(error){
    next(error)
  }
});


//Update a post
//PATCH request 

postsRouter.patch('/:postId', async (req, res, next) => {
  try{
    const post = await prisma.post.update({
      where: {
        authorId: req.params.id
      }
    })
    res.send(post)
  }catch(error){
    next(error)
  }
});



//Delete a post 
postsRouter.delete('/:postId', async (req, res, next) => {
  try{
    const post = await prisma.post.delete({
      where: {
        authorId: req.params.id 
      }
    })
    res.send(post)

  }catch(error){
    next(error)
  }
});



module.exports = postsRouter;