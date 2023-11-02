// //brcypt library is used to hash passwords

// const { Client } = require('pg') // imports the pg module
// const bcrypt = require('bcrypt');
// const SALT_COUNT = 10;

// const client = new Client({
//   connectionString: process.env.DATABASE_URL || 'postgres://localhost:5432/juicebox-dev',
//   ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : undefined,
// });

// /**
//  * USER Methods
//  */


// //Create user 
// async function createUser({username, password, name, location}) {
//   const hashedPassword = await bcrypt.hash(password, SALT_COUNT)
//   try{
//     const user = await prisma.user.create({
//       data: {
//         username,
//         password:hashedPassword,
//         name,
//         location
//       }
//     })
//     res.send(user)
//     return user 

//   }catch(error){
//     throw(error)
//   }
// }


// //Update user 
// async function updateUser(id, fields = {}) {
//   // build the set string
//   const setString = Object.keys(fields).map(
//     (key, index) => `"${ key }"=$${ index + 1 }`
//   ).join(', ');

//   // return early if this is called without fields
//   if (setString.length === 0) {
//     return;
//   }

//   try{
//     const user = await prisma.user.update({
//       where: { id },
//       data: fields  //??? 
//     })

//     return user 

//   }catch(error){
//     throw(error)
//   }
// }


// //Get all users 
// async function getAllUsers() {
//   try{
//     const users = prisma.users.findMany({
//       //"select" - to specify which fields to include in database. 
//       select: {
//         id: true,
//         username: true,
//         name: true,
//         location: true,
//         active: true
//       }
//     })
//     return users 

//   }catch(error){
//     throw(error);
//   }
// }

// //Get user by id 

// async function getUserById(id) {
//   try{
//     const user = await prisma.user.findUniqueOrThrow({
//       where: { id },
//       select: {
//         id: true,
//         username: true,
//         name: true,
//         location: true,
//         active: true
//       }
//     })

//     user.posts = await getPostsByUser(id);

//     return user 

//   }catch(error){
//     throw(error)
//   }
// }


// //Get user by username 

// async function getUserByUsername(username) {
//   const user = await prisma.user.findMany({
//     where: {username: user.username}, 
//     select: {username:true}
//   });
//   return user 
// }

// //Get Null by username?? what is this? 
// async function getNullByUsername(username){
//   try{
//     const user = await prisma.user.findUnique({
//       where: {username},
//     })

//     if(!user) {
//       return null;
//     }
//     return user 

//   }catch(error){
//     throw(error)
//   }
// };

// /**
//  * POST Methods
//  */

// //Create Post 
// async function createPost() {
//   try{
//     const post = await prisma.post.create({
//       data: {
//         authorId,
//         title,
//         content,
//         tags
//       }
//     });

//     //connect tag and post  // ???? 
//     const tagList = await createTags(tags);   

//     await prisma.post.update({
//       where: { id: post.id },
//       data: {
//         tags: {
//           connect: tagList.map((tag) => ({ id: tag.id })),
//         },
//       },
//     });

//     return post;
//   } catch (error) {
//     throw error;
//   }
// }

// //Update Post 
// async function updatePost(postId, fields = {}){
//   //  // read off the tags & remove that field 
//   //  const tags  = fields; // might be undefined
//   //  delete fields.tags;
 
//    // build the set string
//    const setString = Object.keys(fields).map(
//      (key, index) => `"${ key }"=$${ index + 1 }`
//    ).join(', ');

//   try{
//       if (setString.length > 0) {
//         await prisma.post.update({
//           where: {postId},
//           data: {fields}
//         })
//       } 
//   } catch(error){
//     throw(error)
//     }
// }

// //update post

// async function updatePost(postId, fields = {}) {
//   // read off the tags & remove that field 
//   const { tags } = fields; // might be undefined
//   delete fields.tags;

//   // build the set string
//   const setString = Object.keys(fields).map(
//     (key, index) => `"${ key }"=$${ index + 1 }`
//   ).join(', ');

//   try {
//     // update any fields that need to be updated
//     if (setString.length > 0) {
//       const post = await prisma.post.update({
//         where: {postId},
//         data: {fields}
//       })
//       return post 
//     }

//     // return early if there's no tags to update
//     if (tags === undefined) {
//       return await getPostById(postId);
//     }

//     // make any new tags that need to be made
//     const tagList = await createTags(tags);
//     const tagListIdString = tagList.map(
//       tag => `${ tag.id }`
//     ).join(', ');

//     // delete any post_tags from the database which aren't in that tagList
//     await client.query(`
//       DELETE FROM post_tags
//       WHERE "tagId"
//       NOT IN (${ tagListIdString })
//       AND "postId"=$1;
//     `, [postId]);
    
//     // and create post_tags as necessary
//     await addTagsToPost(postId, tagList);

//     return await getPostById(postId);
//   } catch (error) {
//     throw error;
//   }
// }

// //Get all posts

// async function getAllPosts() {
// try{
//   const posts = await prisma.posts.findMany({
//     where: {
//       id: postId 
//     }
//    })
//    return posts
// } catch(error){
//   throw(error)
// }
// };

// // async function getAllPosts() {
// //   try {
// //     const { rows: postIds } = await client.query(`
// //       SELECT id
// //       FROM posts;
// //     `);

// //     const posts = await Promise.all(postIds.map(
// //       post => getPostById( post.id )
// //     ));

// //     return posts;
// //   } catch (error) {
// //     throw error;
// //   }
// // };

// //Get post by Id 
// async function getPostById(postId) {
//   try {
//     const { rows: [ post ]  } = await client.query(`
//       SELECT *
//       FROM posts
//       WHERE id=$1;
//     `, [postId]);

//     if (!post) {
//       throw {
//         name: "PostNotFoundError",
//         message: "Could not find a post with that postId"
//       };
//     }

//     const { rows: tags } = await client.query(`
//       SELECT tags.*
//       FROM tags
//       JOIN post_tags ON tags.id=post_tags."tagId"
//       WHERE post_tags."postId"=$1;
//     `, [postId])

//     const { rows: [author] } = await client.query(`
//       SELECT id, username, name, location
//       FROM users
//       WHERE id=$1;
//     `, [post.authorId])

//     post.tags = tags;
//     post.author = author;

//     delete post.authorId;

//     return post;
//   } catch (error) {
//     throw error;
//   }
// };

// async function getPostsByUser(userId) {
//   try {
//     const { rows: postIds } = await client.query(`
//       SELECT id 
//       FROM posts 
//       WHERE "authorId"=${ userId };
//     `);

//     const posts = await Promise.all(postIds.map(
//       post => getPostById( post.id )
//     ));

//     return posts;
//   } catch (error) {
//     throw error;
//   }
// };

// async function getPostsByTagName(tagName) {
//   try {
//     const { rows: postIds } = await client.query(`
//       SELECT posts.id
//       FROM posts
//       JOIN post_tags ON posts.id=post_tags."postId"
//       JOIN tags ON tags.id=post_tags."tagId"
//       WHERE tags.name=$1;
//     `, [tagName]);
    
//     return await Promise.all(postIds.map(
//       post => getPostById(post.id)
//     ));
//   } catch (error) {
//     throw error;
//   }
// } ;


// async function deletePost(id){
//   try {
//     const { rows: [routine] } = await client.query(`
//     DELETE FROM routines
//     where id=$1
//     RETURNING *;
//     `, [id]);
//       return routine;
//   }catch(error){
//     throw error;
//   }
// }
// /**
//  * TAG Methods
//  */

// async function createTags(tagList) {
//   if (tagList.length === 0) {
//     return;
//   }

//   const valuesStringInsert = tagList.map(
//     (_, index) => `$${index + 1}`
//   ).join('), (');

//   const valuesStringSelect = tagList.map(
//     (_, index) => `$${index + 1}`
//   ).join(', ');

//   try {
//     // insert all, ignoring duplicates
//     await client.query(`
//       INSERT INTO tags(name)
//       VALUES (${ valuesStringInsert })
//       ON CONFLICT (name) DO NOTHING;
//     `, tagList);

//     // grab all and return
//     const { rows } = await client.query(`
//       SELECT * FROM tags
//       WHERE name
//       IN (${ valuesStringSelect });
//     `, tagList);

//     return rows;
//   } catch (error) {
//     throw error;
//   }
// }

// async function createPostTag(postId, tagId) {
//   try {
//     await client.query(`
//       INSERT INTO post_tags("postId", "tagId")
//       VALUES ($1, $2)
//       ON CONFLICT ("postId", "tagId") DO NOTHING;
//     `, [ postId, tagId ]);
//   } catch (error) {
//     throw error;
//   }
// }

// async function addTagsToPost(postId, tagList) {
//   try {
//     const createPostTagPromises = tagList.map(
//       tag => createPostTag(postId, tag.id)
//     );

//     await Promise.all(createPostTagPromises);

//     return await getPostById(postId);
//   } catch (error) {
//     throw error;
//   }
// }

// async function getAllTags() {
//   try {
//     const { rows } = await client.query(`
//       SELECT * 
//       FROM tags;
//     `);

//     return { rows }
//   } catch (error) {
//     throw error;
//   }
// }

// module.exports = {  
//   client,
//   createUser,
//   updateUser,
//   // getUser,
//   getAllUsers,
//   getUserById,
//   getUserByUsername,
//   getPostById,
//   createPost,
//   updatePost,
//   getAllPosts,
//   getPostsByUser,
//   getPostsByTagName,
//   deletePost,
//   createTags,
//   getAllTags,
//   createPostTag,
//   addTagsToPost,
//   getNullByUsername
// }