const express = require("express");
const {
  createCard,
  getCards,
  getCard,
  getMyCards,
  updateCard,
  likeCard,
  deleteCard,
} = require("../models/cardAccessDataService");
const auth = require("../../auth/authService");
const { normalizeCard } = require("../helpers/normalize");
const { handleError } = require("../../utils/handleErrors");
const router = express.Router();

router.post("/", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    if (!userInfo.isBusiness) {
      return res.status(403).send("Only business users can create new card");
    }

    let card = await normalizeCard(req.body, userInfo._id);
    card = await createCard(card);
    res.status(201).send(card);
  } catch (error) {
    handleError(res, 400, error.message);
  }
});

router.get("/", async (req, res) => {
  try {
    let cards = await getCards();
    res.send(cards);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/my-cards", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    if (!userInfo.isBusiness) {
      return res.sendStatus(403).send("Only business users can get my cards.");
    }
    let cards = await getMyCards(userInfo._id);
    res.send(cards);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    let card = await getCard(id);
    res.send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    const userInfo = req.user;
    const newCard = req.body;
    const { id } = req.params;
    const originalCard = await getCard(id);

    if (userInfo._id != originalCard.user_id && !userInfo.isAdmin) {
      return res
        .status(403)
        .send(
          "Authorization Error: Only the user who created the business card or admin can update its details"
        );
    }

    let card = await normalizeCard(newCard, userInfo._id);
    card = await updateCard(id, card);
    res.send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.patch("/:id", auth, async (req, res) => {
  try {
    let { id } = req.params;
    let userId = req.user._id;
    let card = await likeCard(id, userId);
    res.send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});

router.delete("/:id", auth, async (req, res) => {
  try {
    let { id } = req.params;
    const userInfo = req.user;
    if (userInfo._id != originalCard.user_id && !userInfo.isAdmin) {
      return res
        .status(403)
        .send(
          "Authorization Error: Only the user who created the business card or admin can dalete"
        );
    }
    let card = await deleteCard(id);
    res.send(card);
  } catch (error) {
    res.status(400).send(error.message);
  }
});
module.exports = router;
