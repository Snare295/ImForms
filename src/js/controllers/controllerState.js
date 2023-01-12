const db = require("../connection");

const getAllState = (req, res) => {
    const query = "SELECT * FROM state";
    db.query(query,(err,result) => {
        if (err) res.status(500).json(err);
        res.status(200).json(result);
    });
};

const getState = (req, res) => {
    const query = `SELECT * FROM state WHERE id=${req.params.id}`;
    db.query(query, (err, result) => {
        if (err) res.status(500).json(err);
        if (result.length === 0) res.status(404).json(err);
        res.status(200).json(result[0]);
    });
};

const addNewState = () => {};

const updateState = () => {};

const deleteAllState = () => {};

const deleteState = () => {};

module.exports = { getAllState, getState, addNewState, updateState, deleteAllState, deleteState };