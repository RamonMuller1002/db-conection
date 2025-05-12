const express = require('express')
const { dbConection } = require('./db')
const PORT = 8000

const app = express()
app.use(express.json())

const db = dbConection()


app.post('/criarUsuarios', async (req, res) =>{
    const {nome, email} = req.body
    try{
        const result = await db.run(`INSERT INTO usuarios VALUES (?, ?)`, [ nome, email])
        res.status(201).json({msg: "Operação feita com sucesso"})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})


app.listen(PORT, () => { console.log(`Servidor online na porta ${PORT}`) })