const sqlite = require('sqlite3')
const { open } = require('sqlite')
let db = null

//criar uma conexao com o db
async function dbConection(query) {
    try {
        db = await open({
            filename: './banco.db',
            driver: sqlite.Database
        })
        setup(db);
        return db
    } catch (err) {
        console.log(err)
    }
}

async function setup(db) {

    //executar o script simples de criacao de tabela
    await db.exec(`PRAGMA foreign_keys = ON;`)
    await db.exec(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL,
            idade NUMBER
            )`)
    await db.exec(`CREATE TABLE IF NOT EXISTS tarefas (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            descricao TEXT,
            responsavel INTEGER, 
            FOREIGN KEY (responsavel) REFERENCES usuarios(id)
            )`)
}

async function criar(query, valores) {
    return db.run(query, valores)
}

async function ler(query) {
    return db.all(query)
}

module.exports = { dbConection, criar, ler }