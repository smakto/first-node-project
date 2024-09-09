const express = require("express");
const app = express();
app.use(express.json());

const cors = require("cors");

const { MongoClient, ObjectId } = require("mongodb");
app.use(cors());

require("dotenv").config();
const port = process.env.PORT || 8080;

app.listen(port, () => console.log(`Server is running on port ${port}`));

const client = new MongoClient(process.env.CONNECTION);

let conn;
let db;

async function connect() {
  try {
    conn = await client.connect();
    db = conn.db("LastMongo");
  } catch (e) {
    console.error(e);
  }
}

connect();

app.get("/memberships", async (req, res) => {
  try {
    let collection = await db.collection("services");
    let results = await collection.find().sort({ price: 1 }).toArray();
    res.send(results).status(200);
  } catch (e) {
    res.json(e);
  }
});

app.post("/memberships", async (req, res) => {
  try {
    const newMembShip = req.body;
    let collection = await db.collection("services");
    let results = await collection.insertOne(newMembShip);
    res.json({ success: true });
  } catch (e) {
    res.json(e);
  }
});

app.delete("/memberships/delete/:id", async (req, res) => {
  try {
    let objectedId = new ObjectId(req.params.id);
    let collection = await db.collection("services");
    let results = await collection.deleteOne({
      _id: objectedId,
    });
    res.send(results).status(200);
  } catch (e) {
    res.json(e);
  }
});

app.post("/users", async (req, res) => {
  try {
    const newName = req.body.name;
    const newSurname = req.body.surname;
    const newEmail = req.body.email;
    const newID = req.body.service_id;

    const userIP = req.ip;

    let newUser = {
      name: newName,
      surname: newSurname,
      email: newEmail,
      service_id: newID,
      ip: userIP,
    };
    let collection = await db.collection("users");
    let results = await collection.insertOne(newUser);
    res.json({ success: true });
  } catch (e) {
    res.json(e);
  }
});

app.get("/users/:order", async (req, res) => {
  try {
    let collection = await db.collection("users");
    let results = await collection
      .aggregate([
        { $addFields: { objectedIDserv: { $toObjectId: "$service_id" } } },
        {
          $lookup: {
            from: "services",
            localField: "objectedIDserv",
            foreignField: "_id",
            as: "services",
          },
        },
        {
          $project: {
            _id: 1,
            service_id: 1,
            name: 1,
            surname: 1,
            email: 1,
            ip: 1,
            services: { name: 1 },
          },
        },
      ])
      .sort({ name: Number(req.params.order) })
      .toArray();

    res.send(results).status(200);
  } catch (e) {
    res.json(e);
  }
});

/// Patch vietoje post.

app.post("/users/edit/:id", async (req, res) => {
  try {
    const newName = req.body.name;
    const newSurname = req.body.surname;
    const newEmail = req.body.email;
    const newID = req.body.service_id;
    const userIP = req.ip;

    let userID = new ObjectId(req.params.id);
    console.log(req.params.id);
    console.log(req.body);

    let collection = await db.collection("users");
    let results = await collection.updateOne(
      { _id: userID },
      {
        $set: {
          name: newName,
          surname: newSurname,
          email: newEmail,
          service_id: newID,
          ip: userIP,
        },
      }
    );
    res.json({ success: true });
  } catch (e) {
    res.json(e);
  }
});
