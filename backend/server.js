const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const companyRoutes = require('./routes/companyRoutes');
const jobRoutes = require('./routes/jobRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();
require('dotenv').config();

app.use(cors({
    origin: 'http://localhost:3000',
    credentials: true, 
}));

app.use(express.json());
app.use(cookieParser());

app.use('/api/signUp', companyRoutes);
app.use('/api/jobs', jobRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req, res) => {
    res.send('Hello World');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Connected to the server at ${PORT}`);
});

mongoose.connect('mongodb+srv://MERN:OabOhihuXOjL2fRB@cluster0.tiglnj5.mongodb.net/cuvette?retryWrites=true&w=majority&appName=Cluster0', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
}).then(() => {
    console.log("MongoDB Connected");
}).catch((error) => {
    console.log(error);
});
