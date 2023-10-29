const {PrismaClient} = require('@prisma/client')
const prisma = new PrismaClient();


const {  
    client,
    createUser,
    updateUser,
    getAllUsers,
    getUserById,
    createPost,
    updatePost,
    getAllPosts,
    getAllTags,
    getPostsByTagName
  } = require('./index');
  
//SQL CREATE TABLES CODE used to be here 



//Create initial users

async function createInitialUsers() {
    try{
        console.log("Starting to create users...");
        await prisma.user.create({
            data: {
                username: 'albert', 
                password: 'bertie99',
                name: 'Al Bert',
                location: 'Sidney, Australia'
            }
        });
        await prisma.user.create({ 
            data: {
                username: 'sandra', 
                password: '2sandy4me',
                name: 'Just Sandra',
                location: 'Ain\'t tellin\'',
            }
            
          });
          await prisma.user.create({ 
            data: {
                username: 'glamgal',
                password: 'soglam',
                name: 'Joshua',
                location: 'Upper East Side'
            }
            
          });
          
          console.log("Finished creating users!");

    } catch(error){
        console.log("Error creating users!")
        throw(error)
    }
    
}

//Create initial posts 

async function createInitialPosts(){
    try{
        console.log("Starting to create posts...")

        const albert = await prisma.user.findUnique({where: {username: 'albert'}});
        const sandra = await prisma.user.findUnique({where: {username: 'sandra'}});
        const glamgal = await prisma.user.findUnique({where: {username: 'glamgal'}});

        await prisma.post.create({
            data: {
                    authorId: albert.id,
                    title: "First Post",
                    content: "This is my first post. I hope I love writing blogs as much as I love writing them.",
                    tags: ["#happy", "#youcandoanything"]
            }
        });

        await prisma.post.create({
            data: {
                title: "How does this work?",
                content: "Seriously, does this even do anything?",
                tags: ["#happy", "#worst-day-ever"]
            }
        });

        await prisma.post.create({
            data: {
                title: "Living the Glam Life",
                content: "Do you even? I swear that half of you are posing.",
                tags: ["#happy", "#youcandoanything", "#canmandoeverything"]
                    
            }
        });
        console.log("Finished creating posts!");

    } catch(error){
        console.log("Error creating posts!")
        throw(error)
    }
};

async function rebuildDB() {
    try{
        await prisma.$connect();

        await createInitialUsers();
        await createInitialPosts();
    }catch(error){
        console.error("Error during rebuildDB")
        throw error;
    }
    await prisma.$disconnect();
}



  rebuildDB()
  .then(() => {
    console.log("Database rebuild completed");
  })
  .catch((error) => {
    console.error(error, "Error during database rebuild")
  })



