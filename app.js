
const port = 3000
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cluster = require('cluster');
const totalCPUs = require('os').cpus().length;
require('dotenv/config');
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Connect to DB...
mongoose.connect(process.env.DB_CONNECTION,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }, () => {
        console.log('connected to database....');
    })

if (cluster.isMaster) {
    console.log(`Number of CPUs is ${totalCPUs}`);
    console.log(`Master ${process.pid} is running`);

    // Fork workers.
    for (let i = 0;i < totalCPUs;i++) {
        cluster.fork();
    }

    cluster.on('exit', (worker, code, signal) => {
        console.log(`worker ${worker.process.pid} died`);
        console.log("Let's fork another worker!");
        cluster.fork();
    });

} else {
    const app = express();
    console.log(`Worker ${process.pid} started`);
    app.get('/', (req, res) => {
        res.send('We are on home....');
    })
    // Import Routes
    const postRoutes = require('./routes/postsRoutes');
    app.use("/posts", postRoutes);

    app.listen(port, () => {
        console.log(`Example app listening on port ${port}!`)
    })

}





