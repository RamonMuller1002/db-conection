const express = require('express')
const { dbConection } = require('./db')
const PORT = 8000

const app = express()
app.use(express.json())

const db = dbConection()


app.post('/criarUsuarios', async (req, res) =>{
    const {nome, email, idade} = req.body
    try{
        const result = await db.run(`INSERT INTO usuarios VALUES (?, ?)`, [ nome, email, idade])
        res.status(201).json({msg: "Operação feita com sucesso"})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})

app.get('/lerUsuarios', async (req, res) =>{
    try{
        const result = await db.all(`SELECT * FROM usuarios`)
        console.log(result)
        res.send(result)
        res.status(201).json({msg: "Operação feita com sucesso"})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})

app.post('/criarTarefa', async (req, res) =>{
    const {nome, descricao, responsavel} = req.body
    try{
        const result = await db.run(`INSERT INTO tarefa VALUES (?, ?)`, [ nome, descricao, responsavel])
        res.status(201).json({msg: "Operação feita com sucesso"})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})

app.get('/lerTarefas', async (req, res) =>{
    try{
        const result = await db.all(`SELECT * FROM tarefas`)
        console.log(result)
        res.send(result)
        res.status(201).json({msg: "Operação feita com sucesso"})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})


app.listen(PORT, () => { console.log(`Servidor online na porta ${PORT}`) })