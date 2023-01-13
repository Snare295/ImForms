const db = require("../connection");
const { use } = require("../routes");

const getAllResults = (req, res) => {
    const query = "SELECT * FROM results";
    db.query(query,(err,result) => {
        if (err) return res.status(500).json(err);
        res.status(200).json(result);
    });
};

const getResults = (req, res) => {
    const query = `SELECT * FROM results WHERE id=${req.params.id}`;
    db.query(query, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json(`Result №${req.params.id} doesn't exist`);
        res.status(200).json(result[0]);
    });
};

const addNewResults = (req, res) => {
    const { id, options_id, users_id } = req.body;

    //check if id, options_id, users_id is empty
    if (!(id && options_id && users_id)) return res.status(400).json("id, options_id, users_id required");

    //check if id already placed
    const queryIdEmpty = `SELECT * FROM results WHERE id=${id}`;
    db.query(queryIdEmpty, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length !== 0) return res.status(406).json('id is occupied by another result');

        //check if options_id exist
        const queryOptions_idExist = `SELECT * FROM options WHERE id=${options_id}`;
        db.query(queryOptions_idExist, (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.length === 0) return res.status(406).json('options_id is not exist');

            //check if users_id exist
            const queryUsers_idExist = `SELECT * FROM options WHERE id=${users_id}`;
            db.query(queryUsers_idExist, (err, result) => {
                if (err) return res.status(500).json(err);
                if (result.length === 0) return res.status(406).json('users_id is not exist');

                //create new result
                const query = `INSERT INTO results VALUES ( '${id}', '${options_id}', '${users_id}')`;
                db.query(query, (err, result) => {
                    if (err) return res.status(500).json(err);
                    res.status(201).json("New result created");
    });
    });
    });
    });
};

const updateResults = (req, res) => {
    const {options_id, users_id } = req.body;

    //check if options_id or users_id empty
    if(!(options_id && users_id)) return res.status(400).json("options_id, users_id are required");

    //check if id exists
    const queryIdExist = `SELECT * FROM results WHERE id=${req.params.id}`
    db.query(queryIdExist, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json(`Result №${req.params.id} doesn't exist`);

        //check if options_id exist
        const queryOptions_idExist = `SELECT * FROM options WHERE id=${options_id}`;
        db.query(queryOptions_idExist, (err, result) => {
            if (err) return res.status(500).json(err);
            if (result.length === 0) return res.status(406).json('options_id is not exist');

            //check if users_id exist
            const queryUsers_idExist = `SELECT * FROM options WHERE id=${users_id}`;
            db.query(queryUsers_idExist, (err, result) => {
                if (err) return res.status(500).json(err);
                if (result.length === 0) return res.status(406).json('users_id is not exist');

                //update options_id in results
                const query = `UPDATE results SET options_id=${options_id}, users_id=${users_id} WHERE id=${req.params.id}`;
                db.query(query, (err) => {
                    if (err) return res.status(500).json(err);
                    res.status(200).json("Results updated");
    });
    });
    });
    });
};

const deleteResults = (req, res) => {
    //check if id exists
    const queryIdExist = `SELECT * FROM results WHERE id=${req.params.id}`;
    db.query(queryIdExist, (err, result) => {
        if (err) return res.status(500).json(err);
        if (result.length === 0) return res.status(404).json(`Result №${req.params.id} doesn't exist`);

        //delete result
        const query = `DELETE FROM results WHERE id=${req.params.id}`;
        db.query(query, (err, result) => {
            if (err) return res.status(500).json(err);
            res.status(200).json("Result deleted");
    });
    });
};

module.exports = { getAllResults, getResults, addNewResults, updateResults, deleteResults };