require("dotenv").config();
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const aws = require('aws-sdk');
const fs = require('fs');
const fileType = require('file-type');
const multiparty = require('multiparty');
const application = require("../services/auth");

aws.config.update({
  secretAccessKey: process.env.S3_ACCESS_SECRET,
  accessKeyId: process.env.S3_ACCESS_KEY,
  region: "ap-southeast-1",
});
const form = new multiparty.Form();
const s3 = new aws.S3();

module.exports = {
  login: async (req, res) => {
    const { email, password } = req.body;
    let message = "";
    let data = {};

    try{
      // CHECK USERNAME
      const userExist = await application.findUser(email);
      if (userExist.length === 0){
          message = "username is not exist!"
      }
  
      // data user if exist
      const userProfile = userExist[0].dataValues;
      // ! hashed password userExist from database
      const savedPassword = userProfile.password; 
  
      // CHECK PASSWORD
      const comparePassword = await bcrypt.compare(
        password,
        savedPassword
      );
      
      // IF PASSWORD WRONG 
      if (comparePassword === false) {
          message = "password is incorrect";
      } else {
          // IF PASSWORD RIGHT GENERATE TOKEN
          const token = jwt.sign(userProfile, process.env.SECRET_KEY_TOKEN, {
              expiresIn: "3000000s",});
              data = token;
          }
      res.send({
          status: 200,
          error: true,
          error_message: {},
          message: message,
          data: data
      });
    } catch(err){
      res.send(error)
    }
  },

  // REGISTER
  insert: async (req, res) => {
    const { email, password } = req.body;
    try{
      const checkUsernameExist = await application.findUser(email);
  
      let message = "";
      if (checkUsernameExist.length !== 0) {
        // IF USERNAME EXIST
        message = "email already registered";
      } else {
        // IF USERNAME DOES NOT EXIST
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);
  
        await application.insert(email, hashedPassword);
        message = "register sucsess";
      }
  
      res.send({
        status: 200,
        error: true,
        error_message: {},
        message: message,
        data: [],
      });
    } catch(error){
      res.send(error)
    }
  },

  // UPDATE USER
  update: async (req, res) => {
    const { email, full_name, address, phone } = req.body
    const id = data.id;
    try{
      // IF TOKEN VALID USER CAN UPDATE PERSONAL INFORMATION
      const updateData = await application.updateUser(
        id,
        email,
        full_name,
        address,
        phone
      )
      res.send(updateData)
    } catch(error){
      res.send(error)
    }
  },

  // SHOPPING CART
  cart: async (req, res) => {
    const { email, password } = req.body;
    let message = "";
    let data = {};
  
    try{
      // CHECK USERNAME
      const userExist = await application.findUser(email);
      if (userExist.length === 0){
          message = "username is not exist!"
      }
  
      // data user if exist
      const userProfile = userExist[0].dataValues;
      // ! hashed password userExist from database
      const savedPassword = userProfile.password; 
  
      // CHECK PASSWORD
      const comparePassword = await bcrypt.compare(
        password,
        savedPassword
      );
      
      // IF PASSWORD WRONG 
      if (comparePassword === false) {
          message = "password is incorrect";
      } else {
          // IF PASSWORD RIGHT GENERATE TOKEN
          const token = jwt.sign(userProfile, process.env.SECRET_KEY_TOKEN);
              data = token;
          }
      res.send({
          status: 200,
          error: true,
          error_message: {},
          message: message,
          data: data
      });
    } catch(err){
      res.send(error)
    }
  },

  // add items
  addItem: async (req, res) => {
    const { item_name, price, stock, image } = req.body
    const roles = data.roles;
    if(roles == 1){
      try{
        const addItem = await application.addItem(
          item_name,
          price,
          stock,
          image
        )
        res.send(addItem)
      } catch(error){
        res.send(error)
      }
    } else {
      res.send({
        status: 500,
        message: "only admin can add items"
      })
    }
  },

  uploadPict: async (req, res) => {
    form.parse(req, async (error, fields, files) => {
      if (error) {
        return res.status(500).send(error);
      };
      
      try {
        const path = files.image[0].path;
        const buffer = fs.readFileSync(path);
        const type = await fileType(buffer);
        const fileName = `images/${Date.now().toString()}`;
    
        const params = {
          ACL: 'public-read',
          Body: buffer,
          Bucket: 'mymoviesapp',
          ContentType: type.mime,
          Key: `${fileName}.${type.ext}`,
        };       

        const upload = await s3.upload(params).promise();
        const image = upload.Location;
        const {id}= req.headers;
        const addItem = await application.upload(
          id,
          image
        )
        return res.status(200).send(req.headers);
      } catch (error) {
        console.log(error);         
        return res.status(500).send(error);
      }
    });
  },

  getList: async (req, res) => {
    const {item_name} = req.body;
    try{     
      const getList =  await application.getList();
      res.send({
        status: 200,
        data: getList
      });
    }catch(error){
      res.send(error)
    }
  },
};

