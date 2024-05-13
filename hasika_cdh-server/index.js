const express = require('express')
const app = express()
const cors = require('cors');
const port = process.env.PORT || 5000
require('dotenv').config()
app.use(express.json())
app.use(cors())

//user: hasika202005
//password: yf6FfgSIxizIoYRt


const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cbit-career-hub.9oen9lx.mongodb.net/?retryWrites=true&w=majority&appName=cbit-career-hub`;

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

    const db = client.db("wt_assignment")
    const collection = db.collection("career_dev")

    app.post("/post-job", async(request, response) => {
      const body = request.body;
      body.createAt = new Date()
      //console.log(body)
      const result = await collection.insertOne(body);
      if(result.insertedId){
        return response.status(200).send(result);
      }else {
        return response.status(404).send({
          message: "cannot insert, Try again later!",
          status: false
        })
      }
      
    })

    app.get("/all-jobs", async(request, response) => {
      const jobs = await collection.find({}).toArray()
      response.send(jobs);
    })

    app.get("/all-jobs/:id", async(request, response) => {
      const id = request.params.id;
      const job = await collection.findOne({
          _id: new ObjectId(id)
      })
      response.send(job);
    })

    app.get("/myJobs/:email", async(request, response) => {
      // console.log(request.params.email)
      const jobs = await collection.find({postedBy : request.params.email}).toArray();
      response.send(jobs)
    })

    app.delete("/job/:id", async(request, response) => {
      const id = request.params.id
      const filter = {_id: new ObjectId(id)}
      const result = await collection.deleteOne(filter)
      response.send(result)
    })

    app.patch("/update-job/:id", async(request, response) => {
      const id = request.params.id
      const jobData = request.body;
      const filter = {_id: new ObjectId(id)}
      const options = { upsert: true }
      const updateDoc = {
        $set: {
          ...jobData
        }
      }
      const result = await collection.updateOne(filter, updateDoc, options)
      response.send(result)
    })
    // Send a ping to confirm a successful connection
    await client.db("admin").command({ ping: 1 });
    console.log("Pinged your deployment. You successfully connected to MongoDB!");
  } finally {
    // Ensures that the client will close when you finish/error
    //await client.close();
  }
}
run().catch(console.dir);


app.get('/', (req, res) => {
  res.send('Hello Developer!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})