require('dotenv').config();
const sequelize = require('./config/db');
const express = require('express');
const app = express();
const path = require('path');
const userRoutes = require('./Routes/userRoutes')
const PORT = process.env.PORT || 3500;

// middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

//serve static files
app.use('/', express.static(path.join(__dirname, '/public')));


app.use('/api/v1/users', userRoutes);

// app.all('*', (req, res) => {
//     res.status(404).json({ "message": "⚠ 404 Not Found" });
//     if (req.accepts('html')) { res.sendFile(path.join(__dirname, 'views', '404.html'));
//     } 
// });

sequelize.authenticate().then(() => {
    console.log('connected to database successfully!'); 
}).catch((error) => {
    console.log('DB connection failed');
});

app.listen(PORT, () => {
    console.log(`\n ⚡️ App listening at port ${PORT}!\n`);
});

