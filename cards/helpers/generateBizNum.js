const _ = require("lodash");
const Card = require("../models/mongodb/Card");

const generateBizNum = async () => {
  let cardCount = await Card.countDocuments();
  if (cardCount === 8_999_999) {
    throw new Error("You reched to maximum cards count in your system");
  }
  let random;
  do {
    random = _.random(1_000_000, 9_999_999);
  } while (await checkBizNumberExsist(random));

  return random;
};

const checkBizNumberExsist = async (bizNumber) => {
  try {
    const bizNumberExsist = await Card.findOne({ bizNumber });
    return Boolean(bizNumberExsist);
  } catch (error) {
    throw new Error("Mongoose :" + error.message);
  }
};

module.exports = { generateBizNum };
