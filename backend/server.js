const express = require('express')
const bcrypt = require('bcrypt')
const mongoose = require('mongoose')
const User = require('./models/user.model.js')

const app = express()
app.use(express.json())
const port = 3000
if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}

app.get('/', (req, res) => {
  res.send('Hello, World!')
})

// MONGODB SETUP

mongoose.connect(process.env.MONGO_URL).then( () => {
  console.log("Connection was successful!");
  app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  });
}).catch(() => {
  console.log("Connection failed!")
})

//

app.post('/api/users/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({username: req.body.username, email: req.body.email, password: hashedPassword});
    res.status(201).json(user).send();
    // Unique email and user check implemented on the db side (see user model)
  }
  catch (error) {
    res.status(500).send(error.message)
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    let user;
    // console.log("Request body:", req.body); // Log the request body
    if (req.body.username) {
      user = await User.findOne({ username: req.body.username }).exec();
      // console.log("Searching by username:", req.body.username); // Log the username
    } else {
      user = await User.findOne({ email: req.body.email }).exec();
      // console.log("Searching by email:", req.body.email); // Log the email
    }
    if (!user) return res.status(404).send("User does not exist!");
    if (await bcrypt.compare(req.body.password, user.password)) {
      res.status(202).send("Login successful!");
    } else {
      res.status(423).send("Incorrect password!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

//