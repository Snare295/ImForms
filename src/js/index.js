const db = require('./connection');
const express = require('express');
const app = express();

const PORT = 3500;

app.use(express.json());

app.use('/api', require('./routes'));

// db.query('INSERT INTO role SET ?', {id: 1, name: 'Respondent'});
// db.query('INSERT INTO role SET ?', {id: 2, name: 'Interviewer'});

db.connect(() => app.listen(PORT, () => console.log(`Server is running on port ${PORT}`)));
