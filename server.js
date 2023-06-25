import express from "express";
import route from "./routes/routes";
import dotenv from 'dotenv';
import session from "express-session";
import mongoose from "mongoose";

dotenv.config();
const { APP_LOCALHOST : hostname, APP_PORT: port } = process.env;
const app = express();

mongoose.connect(process.env.CONNECTBDD)

app.use(
  session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
  })
);

app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.set('view engine', 'ejs'); 

app.use('/', route);

app.listen(port, () => {
  console.log(`Example app listening at http://${hostname}:${port}`);
});
