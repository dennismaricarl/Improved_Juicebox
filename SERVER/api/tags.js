const {PrismaClient, Prisma} = require('./prisma/client')
const prisma = new PrismaClient();

const express = require('express');
const { getPostsByTagName } = require('../db');
const tagsRouter = express.Router();

// <----------------- getAll, getPostsByTagName ------------------> 


//Get all tags
tagsRouter.get('/', async (req, res, next) => {
  try{
    const tag = await prisma.tag.findMany()
    res.send(tag);
  }catch(error){
    next(error)
  }
});


//Get post by tag name 

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  try{  
    const postByTag = await prisma.postByTag.findUnique({
      where:{
        post: {connect: {tag}}  //?????
      }
    })


  }catch(error){
    next(error)
  }
})

tagsRouter.get('/:tagName/posts', async (req, res, next) => {
  let { tagName } = req.params;

  
  // decode %23happy to #happy
  tagName = decodeURIComponent(tagName)

  try {
    const allPosts = await getPostsByTagName(tagName);

    const posts = allPosts.filter(post => {
      if (post.active) {
        return true;
      }

      if (req.user && req.user.id === post.author.id) {
        return true;
      }

      return false;
    })

    res.send({ posts });
  } catch ({ name, message }) {
    next({ name, message });
  }
});

module.exports = tagsRouter;
