
import usersData from './data/users.js';
import mongoose from "mongoose";
import UserModel from "./Models/User.js";
mongoose.connect('mongodb://127.0.0.1:27017/tpNodeJS');


(async () => {
    try {
      await UserModel.insertMany(usersData);
      console.log('Data inserted successfully!');
      mongoose.connection.close();
    } catch (error) {
      console.error('Error inserting data:', error);
    }
  })();

