const express = require('express');
const cors = require('cors');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
require('dotenv').config()

const app = express();
const port = process.env.PORT || 5000;

// middle wares
app.use(cors());
app.use(express.json());



const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.cklgizg.mongodb.net/?retryWrites=true&w=majority`;
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });

async function run() {
    try {
        const serviceCollection = client.db("geniusCar").collection('services');
        app.get('/services', async (req, res) => {
            const quary = {}
            const cursor = serviceCollection.find(quary);
            const services = await cursor.toArray();
            res.send(services);

        });

        app.get('/service/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: ObjectId(id) };
            const service = await serviceCollection.findOne(query);
            res.send(service);
        })
    } finally {

    }

}
run().catch(error => console.log(error));

app.get('/', (req, res) => {
    res.send('Genious car server is running now');
})

app.listen(port, () => {
    console.log(`Genious car server is runnign on ${port}`);
})