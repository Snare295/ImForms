# Реалізація інформаційного та програмного забезпечення

В рамках проекту розробляється:  

## SQL-скрипт для створення на початкового наповнення бази даних  
```
-- MySQL Workbench Forward Engineering

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------

-- -----------------------------------------------------
-- Schema mydb
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb` DEFAULT CHARACTER SET utf8 ;
USE `mydb` ;

-- -----------------------------------------------------
-- Table `mydb`.`role`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`role` (
  `id` INT NOT NULL,
  `name` ENUM('Respondent', 'Interviewer') NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`users`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`users` (
  `id` INT UNSIGNED NOT NULL AUTO_INCREMENT,
  `username` VARCHAR(45) NOT NULL,
  `email` VARCHAR(45) NOT NULL,
  `password` VARCHAR(45) NOT NULL,
  `role_id` INT NOT NULL,
  PRIMARY KEY (`id`, `role_id`),
  UNIQUE INDEX `email_UNIQUE` (`email` ASC) VISIBLE,
  INDEX `fk_users_role1_idx` (`role_id` ASC) VISIBLE,
  CONSTRAINT `fk_users_role1`
    FOREIGN KEY (`role_id`)
    REFERENCES `mydb`.`role` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`quizes`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`quizes` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `end_date` DATE NOT NULL,
  PRIMARY KEY (`id`),
  UNIQUE INDEX `id_UNIQUE` (`id` ASC) VISIBLE)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`questions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`questions` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `title` VARCHAR(45) NOT NULL,
  `help_text` VARCHAR(45) NOT NULL,
  `required` TINYINT NOT NULL,
  `quizes_id` INT NOT NULL,
  PRIMARY KEY (`id`, `quizes_id`),
  INDEX `fk_questions_quizes1_idx` (`quizes_id` ASC) VISIBLE,
  CONSTRAINT `fk_questions_quizes1`
    FOREIGN KEY (`quizes_id`)
    REFERENCES `mydb`.`quizes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`options`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`options` (
  `id` INT NOT NULL,
  `text` VARCHAR(45) NOT NULL,
  `iscorrect` TINYINT NULL,
  `questions_id` INT NOT NULL,
  PRIMARY KEY (`id`, `questions_id`),
  INDEX `fk_options_questions1_idx` (`questions_id` ASC) VISIBLE,
  CONSTRAINT `fk_options_questions1`
    FOREIGN KEY (`questions_id`)
    REFERENCES `mydb`.`questions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`results`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`results` (
  `id` INT NOT NULL,
  `options_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  PRIMARY KEY (`id`, `options_id`, `users_id`),
  INDEX `fk_results_options1_idx` (`options_id` ASC) VISIBLE,
  INDEX `fk_results_users1_idx` (`users_id` ASC) VISIBLE,
  CONSTRAINT `fk_results_options1`
    FOREIGN KEY (`options_id`)
    REFERENCES `mydb`.`options` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_results_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`State`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`State` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`actionType`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`actionType` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  PRIMARY KEY (`id`))
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`actions`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`actions` (
  `id` INT NOT NULL,
  `actedAt` DATETIME NOT NULL,
  `State_id` INT NOT NULL,
  `actionType_id` INT NOT NULL,
  PRIMARY KEY (`id`),
  INDEX `fk_actions_State1_idx` (`State_id` ASC) VISIBLE,
  INDEX `fk_actions_actionType1_idx` (`actionType_id` ASC) VISIBLE,
  CONSTRAINT `fk_actions_State1`
    FOREIGN KEY (`State_id`)
    REFERENCES `mydb`.`State` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_actions_actionType1`
    FOREIGN KEY (`actionType_id`)
    REFERENCES `mydb`.`actionType` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


-- -----------------------------------------------------
-- Table `mydb`.`groups`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb`.`groups` (
  `id` INT NOT NULL,
  `name` VARCHAR(45) NOT NULL,
  `description` VARCHAR(45) NOT NULL,
  `creatorId` INT NOT NULL,
  `actions_id` INT NOT NULL,
  `users_id` INT NOT NULL,
  `users_Roles_id` INT NOT NULL,
  `quizes_id` INT NOT NULL,
  PRIMARY KEY (`id`, `actions_id`, `users_id`, `users_Roles_id`, `quizes_id`),
  INDEX `fk_groups_actions1_idx` (`actions_id` ASC) VISIBLE,
  INDEX `fk_groups_users1_idx` (`users_id` ASC, `users_Roles_id` ASC) VISIBLE,
  INDEX `fk_groups_quizes1_idx` (`quizes_id` ASC) VISIBLE,
  CONSTRAINT `fk_groups_actions1`
    FOREIGN KEY (`actions_id`)
    REFERENCES `mydb`.`actions` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_groups_users1`
    FOREIGN KEY (`users_id`)
    REFERENCES `mydb`.`users` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION,
  CONSTRAINT `fk_groups_quizes1`
    FOREIGN KEY (`quizes_id`)
    REFERENCES `mydb`.`quizes` (`id`)
    ON DELETE NO ACTION
    ON UPDATE NO ACTION)
ENGINE = InnoDB;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;

```


# RESTfull сервіс для управління даними

## Файл підключення до бази даних connection.js

```js
const mysql = require('mysql');

const db = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'vlad1234',
    database: 'mydb'
});

module.exports = db;
```
## Кореневий файл серверу index.js

```js
const db = require('./connection');
const express = require('express');
const app = express();

const PORT = 3500;

app.use(express.json());

app.use('/api', require('./routes'));

db.connect(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)));
```

##  Файл з роутером routes.js

 ```js
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
 ```

##  Файл контролерів для обробки запитів таблиці state - controllerState.js

```js
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
```
## Файл контролерів для обробки запитів таблиці result - controllerResult.js

```js
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
```
