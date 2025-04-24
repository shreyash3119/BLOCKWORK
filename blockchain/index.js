const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const Freelancer = require('./models/Freelancer');
const Client = require('./models/Client');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  dbName: 'freelancerPlatform',
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch(err => console.error("❌ MongoDB connection error:", err));

// Health Check
app.get('/', (req, res) => {
  res.send("Backend is running 🚀");
});

// 🔐 Signup
app.post('/api/signup', async (req, res) => {
  const { role, name, email, password, hourlyRate, skills, description } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    let user;

    if (role === 'freelancer') {
      if (!hourlyRate || !skills || !description) {
        return res.status(400).json({ message: 'Missing required freelancer fields.' });
      }

      user = new Freelancer({
        name,
        email,
        password: hashedPassword,
        hourlyRate,
        skills,
        description,
      });
    } else {
      user = new Client({
        name,
        email,
        password: hashedPassword,
      });
    }

    await user.save();
    res.status(201).json({ message: `${role} registered successfully!` });
  } catch (error) {
    console.error('Signup error:', error);
    res.status(400).json({ message: 'Signup error', error });
  }
});

// 🔓 Login
app.post('/api/login', async (req, res) => {
  const { email, password, role } = req.body;
  const Model = role === 'freelancer' ? Freelancer : Client;

  try {
    const user = await Model.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    res.status(200).json({
      message: 'Login successful',
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
        role,
      },
    });
  } catch (error) {
    console.error('Login failed:', error);
    res.status(500).json({ message: 'Login failed', error });
  }
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
