const MAX_RANDOM_INT = 10000
const PORT = 3000

const express = require('express')
const mysql = require('mysql2/promise.js');
const app = express()
const config = {
    host: 'db',
    user: 'root',
    password: 'root',
    database: 'nodedb'
};

app.get('/', async (req, res) => {
    await insertPerson()
    const response = await getBodyResponse();
    res.send(response)
})

app.listen(PORT, () => {
    console.log('Rodando na porta ' + PORT)
})

async function insertPerson() {
    const connection = await mysql.createConnection(config);
    const name = 'John Doe ' + getRandomInt()
    const sql = `INSERT INTO people(name) values('${name}')`
    connection.query(sql)
    connection.end()
}

async function getPeople() {
    const connection = await mysql.createConnection(config);
    const sql = 'select * from people'

    const [results, fields] = await connection.query(sql)
    return results.map(x => x['name']);
}

function getRandomInt() {
    return Math.floor(Math.random() * MAX_RANDOM_INT)
}

async function getBodyResponse() {
    const result = await getPeople()

    const body = `
    <h1>Full Cycle Rocks!</h1>
    <ul>
        ${result?.map(x => `<li>${x}</li>`).join('\n')}
    </ul>`

    return body;
}