const express = require("express")
const router = express.Router()

const {getShortPolling} = require("../controllers/short-product.js")
const {getPetShort} = require("../controllers/short-pets.js")
const { getPetLong } = require("../controllers/long-pets.js");
const { getLongPolling } = require("../controllers/long-product.js");

router.get("/products-long", getLongPolling);
router.get("/products",getShortPolling)
router.get("/pets",getPetShort)
router.get("/pets-long", getPetLong);


module.exports = router                                     






