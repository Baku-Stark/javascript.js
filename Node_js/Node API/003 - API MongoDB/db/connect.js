const { MongoClient } = require("mongodb");

const uri = `mongodb+srv://${process.env.MONGODB_USERNAME}:${process.env.MONGODB_PASSWORD}@nodeapi.61bjodc.mongodb.net/?retryWrites=true&w=majority`;

const client = new MongoClient(uri);
client.connect();

const dbName = "myListUsers";
const collectionName = "users";

const database = client.db(dbName);
const collection = database.collection(collectionName);

class DataBase{
  async get_all_users(){
    try {
      const usersList = [];

      const query = {};
      const options = {
        "name": 1, "age": 1, "job": 1
      };

      const cursor = await collection.find(query, {"name": 1, "age": 1, "job": 1});

      for await (const data of cursor) {
        // console.dir(data);
        usersList.push(data);
      }

      return usersList
    }
    
    catch (err) {
      console.error(`Situation (get_all_users): ${err}\n`);
    }
  }

  async get_user_by_name(name){
    /**
    * Get a data in DataBase
      @param {String} : name
    */
    try {
      var user_get = {};
    
      const cursor = await collection.find({'name': name});

      for await (const doc of cursor) {
        // console.dir(doc);
        if(doc.name == name){
          user_get = doc
        }
        
      }
      return user_get
    }
    
    catch (err) {
      console.error(`Situation (get_user_by_name): ${err}\n`);
    }
  }

  async insert_user(user){
    /**
    * Insert user in DataBase
      @param {Object} : user
    */ 
    try {
      const cursor = await collection.insertOne(user)
  
      // console.log("Great! " + cursor.insertedId)
      return {"data": cursor.insertedId}
    }
    
    catch (err) {
      console.error(`Situation (insert_user): ${err}\n`);
    }
  }

  async delete_user(user){
    /**
    * Delete user in DataBase
      @param {String} : user
    */ 
    try {
      const cursor = await collection.deleteOne({'name': user})
  
      console.log("User Deleted! " + cursor.acknowledged);

      return {"data": user}
    }
    
    catch (err) {
      console.error(`Situation (delete_user): ${err}\n`);
    }
  }

  async update_user(user, update_info){
    /**
    * Update user in DataBase
      @param {String} : user
      @param {Object} : update_info
    */ 
    try {
      const options = { upsert: true };
      const cursor = await collection.updateOne({'name': user}, { $set: update_info }, options)
  
      console.log("User Updated! " + cursor.matchedCount);

      return {"data": user}
    }
    
    catch (err) {
      console.error(`Situation (delete_user): ${err}\n`);
    }
  }
}

module.exports = {
  DataBase
}