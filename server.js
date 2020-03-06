const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const knex = require('knex');

const db = knex({
    client: 'pg',
    connection: {
        host: '127.0.0.1',
        user: 'postgres',
        password: '123',
        database: 'postgres'
    }
});

const app = express();

app.use(bodyParser.json());
app.use(cors());

app.post('/', (req, res) => {
    if (req.body.name.trim().length >= 3) {
        db.select('name', 'portion_default', 'portion_amount', 'portion_display_name', 'increment', 'calories')
            .from('foods')
            .where('name', 'ILIKE', `%${req.body.name}%`)
            .then(data => {
                res.json(data);
            })
            .catch(err => res.status(400).json('There is an error'));
    }  else {
        res.status(400).json('Cannot find result');
    }
})

const PORT = process.env.PORT;
app.listen(PORT || 3000, () => {
    console.log(`app server is listening on ${PORT}`);
})

console.log(PORT);
// steps:
// 1 . server: receive POST req from frontend and uses req.body.name
//         to match name in the database.
//
// 2 . database: receive name and return data(array of obj) to the server.
//
// 3 . server: receive data from database and response data to the frontend.


