const express = require('express')
const bcrypt = require('bcrypt')
const cors = require('cors')
const mongoose = require('mongoose')
const User = require('./models/user.model.js')
const Grill = require('./models/grill.model.js')
const jwt = require('jsonwebtoken')
const path = require('path')

const multer = require('multer')
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, path.join(__dirname, '../imgs/'))
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
    cb(null, file.fieldname + '-' + uniqueSuffix + path.extname(file.originalname))
  }
})
const upload = multer({ storage })

const app = express()

// Configure CORS to allow frontend origin
app.use(cors({
  origin: 'http://localhost:5173', // Vite dev server default port
  credentials: true
}))

app.use(express.json())
app.use('/imgs', express.static(path.join(__dirname, '../imgs')));
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

// Grill uploads

app.post('/api/grills/upload', authenticateToken, upload.single('grill'), async (req, res, next) => {
  if (!req.file) {
    return res.status(400).send("No file uploaded!");
  }
  
  const newGrill = new Grill({
      name: req.body.name,
      menu: req.body.menu,
      description: req.body.description,
      photoUrl: 'imgs/' + req.file.filename, 
      creatorId: req.user.id // Extracted from JWT
  });

  try {
      const savedGrill = await newGrill.save();
      res.status(200).json({ 
          message: "Uploaded successfully!", 
          grill: savedGrill 
      });
  } catch (err) {
      res.status(500).send("Error saving grill: " + err.message);
  }
})

app.get('/api/grills/my-grills', authenticateToken, async (req, res) => {
  try {
    const grills = await Grill.find({ creatorId: req.user.id }).sort({ _id: -1 });
    const grillsWithLikeStatus = grills.map(grill => ({
      ...grill.toObject(),
      isLiked: grill.likedBy.some(id => id.toString() === req.user.id)
    }));
    res.status(200).json(grillsWithLikeStatus);
  } catch (err) {
    res.status(500).send("Error fetching grills: " + err.message);
  }
})

app.get('/api/grills/leaderboard', async (req, res) => {
  try {
    const grills = await Grill.find().populate('creatorId', 'username').sort({ mici: -1 });
    
    const token = req.headers.authorization?.split(' ')[1];
    let userId = null;
    
    if (token) {
      try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        userId = decoded.id;
      } catch (err) {
        //
      }
    }
    
    const grillsWithLikeStatus = grills.map(grill => {
      const liked = userId ? grill.likedBy.some(id => id.toString() === userId) : false;
      return {
        ...grill.toObject(),
        isLiked: liked
      };
    });
    
    res.status(200).json(grillsWithLikeStatus);
  } catch (err) {
    res.status(500).send("Error fetching leaderboard: " + err.message);
  }
})

app.post('/api/grills/:id/like', authenticateToken, async (req, res) => {
  try {
    const grill = await Grill.findById(req.params.id);
    
    if (!grill) {
      return res.status(404).send("Grill not found!");
    }
    
    const userId = req.user.id;
    const hasLiked = grill.likedBy.includes(userId);
    
    if (hasLiked) {
      grill.likedBy = grill.likedBy.filter(id => id.toString() !== userId);
      grill.mici = Math.max(0, grill.mici - 1);
    } else {
      grill.likedBy.push(userId);
      grill.mici += 1;
    }
    
    await grill.save();
    
    res.status(200).json({ 
      message: hasLiked ? "Grill unliked!" : "Grill liked!", 
      mici: grill.mici,
      isLiked: !hasLiked
    });
  } catch (err) {
    res.status(500).send("Error liking grill: " + err.message);
  }
})

app.delete('/api/grills/:id', authenticateToken, async (req, res) => {
  try {
    const grill = await Grill.findById(req.params.id);
    
    if (!grill) {
      return res.status(404).send("Grill not found!");
    }
    if (grill.creatorId.toString() !== req.user.id) {
      return res.status(403).send("You don't have permission to delete this grill!");
    }
    
    await Grill.findByIdAndDelete(req.params.id);
    res.status(200).json({ message: "Grill deleted successfully!" });
  } catch (err) {
    res.status(500).send("Error deleting grill: " + err.message);
  }
})

//

app.post('/api/users/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10)
    const user = await User.create({username: req.body.username, email: req.body.email, password: hashedPassword});
    res.status(201).send("Signup successful!")
    // ONLY FOR TESTING PURPOSES. Should remove before the product is makred for production.

    // Unique email and user check implemented on the db side (see user model)
  }
  catch (error) {
    res.status(500).send(error.message)
  }
});

app.post('/api/users/login', async (req, res) => {
  try {
    let user;
    if (req.body.username) {
      user = await User.findOne({ username: req.body.username }).exec();
    } else {
      user = await User.findOne({ email: req.body.email }).exec();
    }
    if (!user) return res.status(404).send("User does not exist!");
    if (await bcrypt.compare(req.body.password, user.password)) {
      /// Implementing JWT Authorisation
      
      let identifier = { id: user._id, username: user.username }
      const accessToken = jwt.sign(identifier, process.env.ACCESS_TOKEN_SECRET)
      res.status(202).json({ token: accessToken, message: "Login successful!" })

      // Question is: where do we store this ?
      // Nvm, I got the processing

      ///

    } else {
      res.status(401).send("Incorrect password!");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
});

function authenticateToken(req, res, next){
  const authHeader = req.headers['authorization']
  const token = authHeader ? authHeader.split(' ')[1] : null
  if(token == null) return res.status(400).send("No token found in auth header.")

  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, user) => {
    if (err) return res.status(403).send("Invalid token!")
    req.user = user
    // Since we only pass in the token, we need this middle-ware to verify that the user in that token was hashed in accordance with out secret key.
    // If it was, then we can make requests as that user.
    // If it was not, then we are restricted.
    next()
  })
}

//