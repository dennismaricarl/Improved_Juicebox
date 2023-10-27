// const {  
//   client,
//   createUser,
//   updateUser,
//   getAllUsers,
//   getUserById,
//   createPost,
//   updatePost,
//   getAllPosts,
//   getAllTags,
//   getPostsByTagName
// } = require('./index');

//SQL CREATE TABLES CODE used to be here 



//Create initial user and their posts 

async function createInitialUser() {
  try{
      console.log("Starting to create users...");
      await prisma.user.create({
          data: {
              username: 'albert', 
              password: 'bertie99',
              name: 'Al Bert',
              location: 'Sidney, Australia',
          posts: {
              create: {
                  title: "First Post",
                  content: "This is my first post. I hope I love writing blogs as much as I love writing them.",
                  tags: ["#happy", "#youcandoanything"]
              }
          }
          }
      });
      await prisma.user.create({ 
          data: {
              username: 'sandra', 
              password: '2sandy4me',
              name: 'Just Sandra',
              location: 'Ain\'t tellin\'',
          posts: {
              create: {
                  title: "How does this work?",
                  content: "Seriously, does this even do anything?",
                  tags: ["#happy", "#worst-day-ever"]
              }
          }
          }
          
        });
        await prisma.user.create({ 
          data: {
              username: 'glamgal',
              password: 'soglam',
              name: 'Joshua',
              location: 'Upper East Side',
          posts: {
                  create:{
                      title: "Living the Glam Life",
                      content: "Do you even? I swear that half of you are posing.",
                      tags: ["#happy", "#youcandoanything", "#canmandoeverything"]
                  }
              }
          }
          
        });
        
        console.log("Finished creating users!");

  }catch(error){
      next(error)
  }
  
}


//   async function rebuildDB() {
//     try {
//       client.connect();

//       await dropTables();
//       await createTables();
//       await createInitialUsers();
//       await createInitialPosts();
//     } catch (error) {
//       console.log("Error during rebuildDB")
//       throw error;
//     }
//   }

// async function testDB() {
//   try {
//     console.log("Starting to test database...");

//     console.log("Calling getAllUsers");
//     const users = await getAllUsers();
//     console.log("Result:", users);

//     console.log("Calling updateUser on users[0]");
//     const updateUserResult = await updateUser(users[0].id, {
//       name: "Newname Sogood",
//       location: "Lesterville, KY"
//     });
//     console.log("Result:", updateUserResult);

//     console.log("Calling getAllPosts");
//     const posts = await getAllPosts();
//     console.log("Result:", posts);

//     console.log("Calling updatePost on posts[0]");
//     const updatePostResult = await updatePost(posts[0].id, {
//       title: "New Title",
//       content: "Updated Content"
//     });
//     console.log("Result:", updatePostResult);

//     console.log("Calling updatePost on posts[1], only updating tags");
//     const updatePostTagsResult = await updatePost(posts[1].id, {
//       tags: ["#youcandoanything", "#redfish", "#bluefish"]
//     });
//     console.log("Result:", updatePostTagsResult);

//     console.log("Calling getUserById with 1");
//     const albert = await getUserById(1);
//     console.log("Result:", albert);

//     console.log("Calling getAllTags");
//     const allTags = await getAllTags();
//     console.log("Result:", allTags);

//     console.log("Calling getPostsByTagName with #happy");
//     const postsWithHappy = await getPostsByTagName("#happy");
//     console.log("Result:", postsWithHappy);

//     console.log("Finished database tests!");
//   } catch (error) {
//     console.log("Error during testDB");
//     throw error;
//   }
// }


// rebuildDB()
//   .then(testDB)
//   .catch(console.error)
//   .finally(() => client.end());