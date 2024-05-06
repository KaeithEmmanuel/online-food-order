const mongoose = require("mongoose");
//const mongoURI ="mongodb+srv://Kaeithemmanuel:Kaeith2004@cluster0.14wxevw.mongodb.net/ekefoods?retryWrites=true&w=majority&appName=Cluster0";
const mongoURI ="mongodb://Kaeithemmanuel:Kaeith2004@ac-tciw20m-shard-00-00.14wxevw.mongodb.net:27017,ac-tciw20m-shard-00-01.14wxevw.mongodb.net:27017,ac-tciw20m-shard-00-02.14wxevw.mongodb.net:27017/ekefoods?ssl=true&replicaSet=atlas-5cz0h6-shard-0&authSource=admin&retryWrites=true&w=majority&appName=Cluster0"
const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("connected to mongodb");
    // const food_data = await mongoose.connection.db.collection("food_items");
    // food_data.find({}).toArray((err, data) => {
    //   if (err) throw err;
    //   else {
    //     global.food_items = data;  
    //   }
    // });
  } catch (err) {
    console.log(err);
  }
};

module.exports = mongoDB;
