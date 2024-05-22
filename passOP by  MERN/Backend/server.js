require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const passOp = require("./Model/passOpSchema");

const app = express();
const port = 3000;
const cors = require("cors");
app.use(cors());

app.use(express.json());

app.get("/", async (req, res) => {
  try {
    let get = await passOp.find({});
    res.json(get);
    console.log("successfull get request");
  } catch (error) {
    console.log("Error while get request", error);
    res.status(500).send("Error");
  }
});

app.post("/post", async (req, res) => {
  try {
    console.log("Request Body:", req.body); // Log the request body
    const { site, username, password } = req.body;
    const post = new passOp({ site, username, password });
    const savedPost = await post.save();
    res.status(201).json(savedPost);
    console.log("successfull post request");
  } catch (error) {
    console.error("Error while saving in post request:", error);
    res.status(500).send("Error saving post");
  }
});

app.delete("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    console.log("Received delete request for ID:", id); // Log the ID received

    const result = await passOp.findByIdAndDelete(id);
    if (result) {
      res.status(200).send(`Document with ID ${id} deleted successfully`);
    } else {
      res.status(404).send(`Document with ID ${id} not found`);
    }
  } catch (error) {
    console.log("Error while delete request", error);
    res.status(500).send("Error while deleting");
  }
});

app.put("/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const { site, username, password } = req.body;
    const result = await passOp.findByIdAndUpdate(id, { site, username, password }, { new: true });
    if (result) {
      res.status(200).json(result);
      console.log(`Document with ID ${id} updated successfully`);
    } else {
      res.status(404).send(`Document with ID ${id} not found`);
    }
  } catch (error) {
    console.error("Error while updating document:", error);
    res.status(500).send("Error while updating");
  }
});



async function connectDB() {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log("connection successfull");
  } catch (error) {
    console.log("connection error", error);
  }
}
connectDB();

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
