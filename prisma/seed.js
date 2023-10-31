const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();
  

//Create initial users

async function createInitialUsers() {
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
                        // tags: ["#happy", "#youcandoanything"]
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
                        // tags: ["#happy", "#worst-day-ever"]
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
                        // tags: ["#happy", "#youcandoanything", "#canmandoeverything"]
                    }
                }
            }
            
          });
          
          console.log("Finished creating users!");

    } catch(error){
        console.log("Error creating users!")
        throw(error)
    }
    
}

async function seedDatabase() {
    try{
        await prisma.$connect();
        await createInitialUsers();
 
    }catch(error){
        console.error("Error during rebuildDB")
        throw error;
    }
    await prisma.$disconnect();
}



seedDatabase()
  .then(() => {
    console.log("Database rebuild completed");
  })
  .catch((error) => {
    console.error(error, "Error during database rebuild")
  })



