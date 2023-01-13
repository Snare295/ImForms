const express = require("express");
const router = express.Router();
const { getAllState, getState, addNewState, updateState, deleteState } = require("./controllers/controllerState");
const { getAllResults, getResults, addNewResults, updateResults, deleteResults } = require("./controllers/controllerResults");

router
  .get("/state", getAllState)
  .get("/state/:id", getState)
  .post("/state", addNewState)
  .put("/state/:id", updateState)
  .delete("/state/:id", deleteState)

  .get("/results", getAllResults)
  .get("/results/:id", getResults)
  .post("/results", addNewResults)
  .put("/results/:id", updateResults)
  .delete("/results/:id", deleteResults);

module.exports = router;
