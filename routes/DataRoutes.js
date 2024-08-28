const express = require("express");
const DataController = require("../controllers/DataController");

const router = express.Router();

router.route('/') // YOU CAN CUSTOMIZE YOUR ROUTE NAME, JUST CHANGE 'route-name' INTO ANYTHING YOU LIKE
    .post(DataController.mass_create) // GET, POST, UPDATE, DELETE, etc.
    .get(DataController.get_all) // GET, POST, UPDATE, DELETE, etc.
    .delete(DataController.delete_all)
module.exports = router;