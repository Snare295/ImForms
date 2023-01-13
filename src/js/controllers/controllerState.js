const db = require("../connection");

const getAllState = (req, res) => {
    const query = "SELECT * FROM state";
    db.query(query,(err,result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(result);
    });
};

const getState = (req, res) => {
    const query = `SELECT * FROM state WHERE id=${req.params.id}`;
    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json(`State №${req.params.id} doesn't exist`);
        res.status(200).json(result[0]);
    });
};

const addNewState = (req, res) => {
    const { id, name } = req.body;

    //check if id or name is empty
    if (!(id && name)) return res.status(400).json("id, name required");

    //check if id already placed
    const queryIdEmpty = `SELECT * FROM state WHERE id=${id}`;
    db.query(queryIdEmpty, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length !== 0) return res.status(406).json('id is occupied by another state');

        //create new state
        const query = `INSERT INTO state VALUES ( '${id}', '${name}')`;
        db.query(query, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(201).json("New state created");
    });
    });
};

const updateState = (req, res) => {
    const { name } = req.body;

    //check if name is empty
    if (!name) return res.status(400).json("New name for state is required");

    //check if id exists
    const queryIdExist = `SELECT * FROM state WHERE id=${req.params.id}`;
    db.query(queryIdExist, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json(`State №${req.params.id} doesn't exist`);

        //update name in state
        const query = `UPDATE state SET name = '${name}' WHERE id=${req.params.id}`;
        db.query(query, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json("State updated");
    });
    });
};

const deleteState = (req, res) => {
    //check if id exists
    const queryIdExist = `SELECT * FROM state WHERE id=${req.params.id}`;
    db.query(queryIdExist, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json(`State №${req.params.id} doesn't exist`);

        //delete state
        const query = `DELETE FROM state WHERE id=${req.params.id}`;
        db.query(query, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json("State deleted");
    });
    });
};

module.exports = { getAllState, getState, addNewState, updateState, deleteState };