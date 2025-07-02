const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const authRoutes = require('./routes/auth');
app.use('/auth', authRoutes);

const companyRoutes = require('./routes/company');
app.use('/company', companyRoutes);

const uploadRoutes = require('./routes/upload');
app.use('/upload', uploadRoutes);


const tenderRoutes = require('./routes/tender');
app.use('/tenders', tenderRoutes);

const applicationRoutes = require('./routes/application');
app.use('/apply', applicationRoutes);

const searchRoutes = require('./routes/search');
app.use('/search', searchRoutes);


// Test protected route
const authenticate = require('./middlewares/jwt');
app.get('/protected', authenticate, (req, res) => {
  res.json({ message: `Hello User ${req.user.id}, you’re authenticated.` });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
