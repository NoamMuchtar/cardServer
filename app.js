const mongoose = require("mongoose");
const express = require("express");
const {
  createCard,
  getCards,
  getCard,
  getMyCards,
  updateCard,
  likeCard,
  deleteCard,
} = require("./cards/models/cardAccessDataService");

const app = express();
const PORT = 8181;
app.use(express.json());

const connectToDb = async () => {
  try {
    await mongoose.connect("mongodb://127.0.0.1:27017/cardsServer");
    console.log("Connected to MongoDB");
  } catch (error) {
    console.error("Could not connect to MongoDB", error);
  }
};

app.post("/cards", async (req, res) => {
  try {
    let card = await createCard(req.body);
    res.send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/cards", async (req, res) => {
  try {
    let cards = await getCards();
    res.send(cards);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/cards/my-cards", async (req, res) => {
  try {
    const { id } = req.body;
    let cards = await getMyCards(id);
    res.send(cards);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.get("/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let card = await getCard(id);
    res.send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.put("/cards/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const newCard = req.body;
    let card = await updateCard(id, newCard);
    res.send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.patch("/cards/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let { userId } = req.body;
    let card = await likeCard(id, userId);
    res.send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.delete("/cards/:id", async (req, res) => {
  try {
    let { id } = req.params;
    let card = await deleteCard(id);
    res.send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log("Server lisening to port " + PORT);
  connectToDb();
});
