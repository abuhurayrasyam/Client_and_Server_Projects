const express = require('express');
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const app = express();
const cors = require('cors');
const port = process.env.port || 3000;

app.use(cors());
app.use(express.json());

//project01
//w8QlQcMOx7OIw9FJ
const uri = "mongodb+srv://project01:w8QlQcMOx7OIw9FJ@cluster0.aamwoxj.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  }
});

async function run() {
  try {
    // Connect the client to the server	(optional starting in v4.7)
    await client.connect();

    // Connect to the "sample_mflix" database and access its "movies" collection
    const database = client.db("usersdb");
    const usersCollection = database.collection("users");

    app.get('/users', async(req, res) => {
      const cursor = usersCollection.find();
      const result = await cursor.toArray();
      res.send(result);
    })

    app.get('/users/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await usersCollection.findOne(query);
      res.send(result);
    })

    app.post('/users', async(req, res) => {
    console.log('data in the server', req.body);
    const newUser = req.body;

    // Insert the defined document into the "movies" collection
    const result = await usersCollection.insertOne(newUser);
    
    res.send(result);
    })

    app.delete('/users/:id', async(req, res) => {
      const id = req.params.id;
      const query = {_id: new ObjectId(id)};
      const result = await usersCollection.deleteOne(query);
      res.send(result);
    })


    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } catch (err) {
    console.error('Error during DB setup:', err);
  }
}
run().catch(console.dir);

app.get('/', (req, res) => {
  res.send('Hello World!');
})

// const users = [
//   {
//     "id": 1,
//     "name": "Abu",
//     "email": "abu@gmail.com"
//   },
//   {
//     "id": 2,
//     "name": "Hurayra",
//     "email": "hurayra@gmail.com"
//   }
// ]

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
})


