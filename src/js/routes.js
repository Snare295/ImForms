const express = require("express");
const router = express.Router();
const { getAllState, getState, addNewState, updateState, deleteAllState, deleteState } = require("./controllers/controllerState");

router
  .get("/state", getAllState)
  .get("/state/:id", getState)
  .post("/state", addNewState)
  .put("/state/:id", updateState)
  .delete("/state/:id", deleteState)
  .delete("/state", deleteAllState);

module.exports = router;
