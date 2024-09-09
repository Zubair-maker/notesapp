import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const connecInstance = await mongoose.connect(`${process.env.MONGO_URI}`);
    // console.log("conn", connecInstance);
    console.log(`\n MONGODB connectted ${connecInstance.connection.host} ${connecInstance.connection.name}`);
  } catch (error) {
    console.log("MOGODB connecttion failed!!");
    process.exit(1);
  }
};

export default connectDB;