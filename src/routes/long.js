const express = require("express")
const router = express.Router()

const {getShortPolling} = require("../controllers/short-product.js")
const {getPetShort} = require("../controllers/short-pets.js")

router.get("/products",getShortPolling)
router.get("/pets",getPetShort)

module.exports = router                                     






