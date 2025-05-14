const sqlite = require('sqlite3')
const { open } = require('sqlite')


//criar uma conexao com o db
async function dbConection(query) {
    try {
        const db = await open({
            filename: './banco.db',
            driver: sqlite.Database
        })



        //executar o script simples de criacao de tabela
        await db.exec(`CREATE TABLE IF NOT EXISTS usuarios (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            nome TEXT NOT NULL,
            email TEXT NOT NULL UNIQUE)`)

/*


        //await db.run(`INSERT INTO usuarios(nome, email) VALUES (? , ?)`, ["Ramon", "ramonmuller1010@gmail.com"])
            const usuarios = await db.all(`SELECT * FROM usuarios`)
            console.log(usuarios)


        await db.close()*/
        return db
    } catch (err) {
        console.log(err)
    }
}
module.exports = { dbConection }

//executar o scrpit de add users
//executar o script simples de leitura da tabela
//encerrar conexao
