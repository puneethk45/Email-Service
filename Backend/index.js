
const express = require('express');
const emailRoutes = require('./routes/emailRoutes');
const pool = require('./config/db');
const app = express();
app.use(express.json());

app.use('/api/emails', emailRoutes);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server  is running on the port ${PORT}`);
});

