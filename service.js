import express, { json } from "express";
import axios from "axios";
import admin from "firebase-admin";
import path from "path";
import dotenv from "dotenv";
import nodemailer from "nodemailer";

dotenv.config();

const url = process.env.FIREBASE_DATABASE_URL ;
const app = express();
const port = process.env.PORT || 3000;

app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.use(express.json()); 

app.get("/", async(req, res) => {
    res.render("login.ejs");
});

app.get("/signUp", (req, res) => {
    res.render("signup.ejs");
});

app.get("/forgotPassword", (req, res) => {
  res.render("forgotPassword.ejs");
});

app.post("/login", async (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
  
    try {
      const response = await axios.get(`${url}/users.json`);
      const users = response.data;
  
      let loginSuccess = false;
      let IDuser = "";
  
      for (const userId in users) {
        const user = users[userId];
  
        if (user.email === email && user.password === password) {
          loginSuccess = true;
          IDuser = userId ;
          break;
        }
      }
  
      if (loginSuccess) {
        res.send(`<script>window.location.href = "/${IDuser}";</script>`);
      } else {
        res.send(`<script>alert("Email or password is incorrect!"); window.location.href = "/";</script>`);
      }
    } catch (error) {
      console.error("Error during login:", error);
      res.status(500).send("Internal Server Error");
    }
});

app.post("/signUp", async (req, res) => {
    const { name, email, password, rePassword } = req.body;
  
    // 🔒 Basic field validation
    if (!name || !email || !password || !rePassword) {
      return res.send("<script>alert('All fields are required!'); window.location.href='/signUp';</script>");
    }
  
    // 🔒 Password match check
    if (password !== rePassword) {
      return res.send("<script>alert('Passwords do not match!'); window.location.href='/signUp';</script>");
    }
  
    // 🔒 Password strength check
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&]).{8,}$/;
    if (!passwordRegex.test(password)) {
      return res.send("<script>alert('Password must be at least 8 characters, include uppercase, lowercase, number, and special character.'); window.location.href='/signUp';</script>");
    }
  
    try {
      const response = await axios.get(`${url}/users.json`);
      const users = response.data;
  
      // 🔍 Check if user already exists
      for (const userId in users) {
        const user = users[userId];
        if (user.email === email) {
          return res.send("<script>alert('Email already registered!'); window.location.href='/signUp';</script>");
        }
      }
  
      // ✅ If not exists, register user
      const data = {
        username: name,
        email: email,
        password: password,
        Contact: {
          Name: "",
          Relation: "",
          Pho: ""
        },
        liveTracking: {
          latitude: "",
          longitude: "",
          status: false
        }
      };
      
  
      await axios.post(`${url}/users.json`, data);
  
      return res.send("<script>alert('Registration successful! Please login.'); window.location.href='/';</script>");
  
    } catch (error) {
      console.error("Error during sign up:", error);
      return res.status(500).send("Internal Server Error");
    }
});
  
app.get("/:IDuser", async (req, res) => {
  const id = req.params.IDuser;
  let User;

  try {
    //finding user
    const response = await axios.get(`${url}/users.json`);
    const users = response.data;

    for (const userId in users) {
      if (userId === id) {
        User = users[userId];
        break;
      }
    }

    if (!User) {
      return res.status(404).send("User not found");
    }

    // trusted contact
    let ArrName = User.Contact.Name.split(",");
    let ArrPho = User.Contact.Pho.split(",");
    let ArrRel = User.Contact.Relation.split(",");
    // Loading page
    res.render("index.ejs", {
      username: User.name || User.username || User.fullName,
      userId: id,
      Name: ArrName,
      Rel: ArrRel,
      Pho: ArrPho,
      user: User
    });
  } catch (err) {
    console.error("Error during user fetch:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/forgotPassword", async (req, res) => {

  const email = req.body.email;

  try {
    const response = await axios.get(`${url}/users.json`);
    const users = response.data;
    let userexist = false;
    let User;
    let id;

    for (const userId in users) {
      const user = users[userId];
      if (user.email === email) {
        userexist = true;
        User = user;
        id = userId;
        break;
      }
    }

    if (!userexist) {
      return res.send("<script>alert('Email Not Found'); window.location.href='/forgotPassword';</script>");
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    function generateRandomPassword(length = 12) {
      const chars =
        "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_-+=<>?";
      let password = "";
      for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        password += chars[randomIndex];
      }
      return password;
    }

    const newPassword = generateRandomPassword();
    const subject = 'Password Reset Confirmation';
    const message = `Dear ${User.name || User.username || User.fullName},

    We have successfully reset your password as per your request.
    
    Your new login credentials are as follows:
    
    Username: ${User.name || User.username || User.fullName}
    
    New Password: ${newPassword}
    
    For your security, please log in immediately and change your password to something memorable yet secure. If you did not request this change, contact our support team right away.
    
    Best regards,
    Guardian Angel Support Team
    website Link: https://guardianangel.onrender.com
    [Customer Care Number]
`;

    const mailInfo = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: subject,
      text: message,
    };

    // Send email and wait for completion
    await transporter.sendMail(mailInfo);

    // Update the password in database after email sent successfully
    await axios.patch(`${url}/users/${id}.json`, { password: newPassword });

    return res.send("<script>alert('Email Sent'); window.location.href='/forgotPassword';</script>");
  } catch (err) {
    console.error("Error during forgot password process:", err);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/trusted-contacts/:IDuser", async(req, res) => {
  const id = req.params.IDuser;
  try {
    const response = await axios.get(`${url}/users.json`);
    let User;
    const users = response.data;
    for (const userId in users) {
      if (userId === id) {
        User = users[userId];
        break;
      }
    }
    
    let ArrName = User.Contact.Name.split(",");
    let ArrPho = User.Contact.Pho.split(",");
    let ArrRel = User.Contact.Relation.split(",");
    
    ArrName.push(req.body.name);
    ArrPho.push(req.body.phone);
    ArrRel.push(req.body.relation);

    User.Contact.Name = ArrName.join(",");
    User.Contact.Relation = ArrRel.join(",");
    User.Contact.Pho = ArrPho.join(",");

    await axios.patch(`${url}/users/${id}.json`, User)

    res.send(`<script>alert("Contact Added Successfully");window.location.href = "/${id}";</script>`);  
  } catch(err){
    console.error("Error during forgot password process:", err);
    return res.status(500).send("Internal Server Error");
  }
});

app.post("/update-personal-info/:IDuser",async(req,res)=>{
  try{const id = req.params.IDuser;

    const response = await axios.get(`${url}/users.json`);
    let User;
    const users =  response.data;
    for (const userId in users) {
      if (userId === id) {
        User = users[userId];
        break;
      }}


  await axios.patch(`${url}/users/${id}.json`,{
    username: req.body.username,
    email: req.body.email,
    phone: req.body.phone,
    address: req.body.address,
  });

  res.send(`<script>alert("Information Updated");window.location.href = "/${id}";</script>`);  
  }catch(err){
    console.error("Error during forgot password process:", err);
    return res.status(500).send("Internal Server Error");
  }
})

app.get("/Delete/:IDuser",(req,res)=>{
  res.render("Delete.ejs",{
    userId : req.params.IDuser,
    msg: `For your security, please confirm your email and enter the code we send you.`
  });
});

app.post("/Delete/:IDuser", async (req, res) => {
  const id = req.params.IDuser;

  try {
    // find user
    const response = await axios.get(`${url}/users.json`);
    const users = response.data;
    let User;

    for (const userId in users) {
      if (userId === id) {
        User = users[userId];
        break;
      }
    }

    if (!User) {
      return res.status(404).send("User not found");
    }

    const BodyEmail = req.body.email ;

    if(BodyEmail != User.email){
      res.render("Delete.ejs",{
        userId : req.params.IDuser,
        msg: `The email provided is not registered with us. Please provide the correct one to proceed.`
      });
      return ;
    }

    // generate 6-digit OTP
    const key = Math.floor(100000 + Math.random() * 900000).toString();

    // store in DB
    await axios.patch(`${url}/users/${id}.json`, { Delete: key });

    // transporter
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    // mail content
    const subject = "GUARDIAN ANGLE account deletion verification code";
    const message = `
    Hello ${User.name || User.username || User.fullName},
    We received a request to delete your GUARDIAN ANGLE account.
    
    Your code is: ${key}
    
    If this request wasn’t made by you, simply ignore this email and your account will remain active.
    
    — Security Team, GUARDIAN ANGLE`;

    const mailInfo = {
      from: process.env.EMAIL_USER,
      to: User.email,
      subject: subject,
      text: message,
    };

    // send email
    await transporter.sendMail(mailInfo);


    // ✅ render confirmation page AFTER sending mail
    res.render("DelConfirmation.ejs", { 
      userId: id,
    msg: `A security code has been sent to your email.
    Enter it below.`
  });

  } catch (err) {
    console.error("Error during user fetch:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/Delete/:IDuser/verify", async (req, res) => {
  const id = req.params.IDuser;
  const enteredOTP = [
    req.body.otp1,
    req.body.otp2,
    req.body.otp3,
    req.body.otp4,
    req.body.otp5,
    req.body.otp6
  ].join(""); // e.g. "123456"

  // fetch user from DB
  const response = await axios.get(`${url}/users/${id}.json`);
  const User = response.data;

  if (!User) return res.status(404).send("User not found");

  if (User.Delete === enteredOTP) {
    // OTP correct → delete user
    await axios.delete(`${url}/users/${id}.json`);
    res.send("<script> alert('Account deleted successfully!'); window.location.href='/'; </script>");
  } else {
    res.render("DelConfirmation.ejs", { 
    userId: id,
    msg: `OOPS! That code doesn't match. 
    Please check and try again.`
  });
  }
});

app.post("/contactsDel/:userId/:index", async (req, res) => {
  const { userId, index } = req.params;

  try {
    const response = await axios.get(`${url}/users/${userId}.json`);
    const user = response.data;

    if (!user || !user.Contact) {
      return res.status(404).send("User or contacts not found");
    }

    let ArrName = user.Contact.Name.split(",");
    let ArrRel = user.Contact.Relation.split(",");
    let ArrPho = user.Contact.Pho.split(",");

    // remove the contact at given index
    ArrName.splice(index, 1);
    ArrRel.splice(index, 1);
    ArrPho.splice(index, 1);

    // update contact strings
    user.Contact.Name = ArrName.join(",");
    user.Contact.Relation = ArrRel.join(",");
    user.Contact.Pho = ArrPho.join(",");

    await axios.put(`${url}/users/${userId}.json`, user);

    res.redirect(`/${userId}`);
  } catch (err) {
    console.error("Error deleting contact:", err);
    res.status(500).send("Internal Server Error");
  }
});

app.post("/", async (req, res) => {
  // location Portal
  const info = req.body;
  res.json({ success: true, message: "Info received successfully!", received: info });

  const userId = info.userID ;

  let sat; // bool type status 
  if(info.status == 'true'|| info.status){
    sat = true;
  } else {
    sat = false;
  }
  console.log(info.status+" "+typeof info.status);
  console.log(sat+" "+typeof sat);


  const data = {
    latitude: info.latitude,
    longitude: info.longitude,
    status: sat
  }

  const response = await axios.get(`${url}/users.json`);
  const users = response.data;
  let user = users[userId];
  try{
    await axios.patch(`${url}/users/${userId}/liveTracking.json`,data);
  } catch (err) {
    console.error("Error during forgot password process:", err);
    return res.status(500).send("Internal Server Error");
  }

});


app.listen(port, () => {
    console.log(`Server running on port: ${port}...`);
});





