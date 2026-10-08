const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const connectDB = require('./config/db');
const path = require('path');

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

app.use('/api/auth',   require('./routes/authRoutes'));
app.use('/api/cakes',  require('./routes/cakeRoutes'));
app.use('/api/orders', require('./routes/orderRoutes'));
app.use('/api/admin',  require('./routes/adminRoutes'));
app.use('/api/payment', require('./routes/paymentRoutes'));



app.listen(process.env.PORT, () => {
  console.log(`Server running on port ${process.env.PORT} 🚀`);
});