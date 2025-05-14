/*anotações
    db.exec() para administrar tabelas (CREATE e DROP)

    db.run() para fazer update em tabela (como INSERT 
        dados, UPDATE campo, DELETE dados)

    db.all() para pegar todos os itens existentes (SELECT por exemplo)

    db.get() para pegar a primeira linha encontrada
*/


const { open } = require('sqlite')
const sqlite3 = require('sqlite3')
// const db = sqlite3.DatabaseSync('./teste-database.db')

async function conectar() {
    const db = await open({
        filename: './teste-database.db',
        driver: sqlite3.Database
    })
    setup(db)

}
conectar();


function setup(db) {
    db.exec(`CREATE TABLE IF NOT EXISTS tarefas (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        descricao TEXT,
        responsavel FOREING KEY REFERENCES usuarios(id)
        )`)
    db.exec(`PRAGMA foreign_keys = ON;`)
    db.exec(`CREATE TABLE IF NOT EXISTS usuarios (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        nome TEXT NOT NULL,
        email TEXT NOT NULL,
        idade NUMBER
        )`)
}

