import mongoose from "mongoose";

// connection to db file

let connected = false

const connectDB = async () =>{
    mongoose.set('strictQuery', true); // this specifies that only the fields that are specified in our schema will be saved in our database

    // if the database is already conneted, dont connet again 
    // we are not creating like express backend, but we are using nextjs api routes which work in a similar way to serverless function
    // basically we hit that function, run it, it will try to connect to our database and do whatever we wanna do, like fetch data,add data.. etc

    if (connected) {
        console.log('MongoDB is already connected...');
        return;   
    }
    // connect to MongoDB
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        
        connected = true; // connect to db then set connected to true
        console.log('MongoDB has been succefully Connected... ' )
    } catch (error) {
        console.log('error--database.js-L23 ', error)
    }
}

export default connectDB