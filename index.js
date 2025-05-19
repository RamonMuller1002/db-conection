const express = require('express')
const { dbConection , criar , ler } = require('./db')
const PORT = 8000

const app = express()
app.use(express.json())

const db = dbConection()


app.post('/Usuarios', async (req, res) =>{
    const {nome, email, idade} = req.body
    try{
        const result = await criar(`INSERT INTO usuarios(nome, email, idade) VALUES (?, ?, ?)`, [ nome, email, idade])
        res.status(201).json({msg: "Operação feita com sucesso"})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})

app.get('/Usuarios', async (req, res) =>{
    try{
        const result = await ler(`SELECT * FROM usuarios`)
        console.log(result)
        res.status(201).json({msg: `Operação feita com sucesso`, dado: result})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})

app.get('/Usuarios/:id', async (req, res) => {
    const id = req.params.id
    try{
        const result = await ler(`SELECT * FROM usuarios WHERE id = ${id}`)
        res.status(201).json({msg: `Operação feita com sucesso`, dado: result})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})

app.put('/Usuarios/:id', async (req, res) => {
    const id = req.params.id
    const {nome, email, idade} = req.body
    try{
        const result = await criar(`UPDATE usuarios SET nome = ?, email = ?, idade = ? WHERE id = ${id}`,[nome, email, idade])
        res.status(201).json({msg: "Operação feita com sucesso"})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})

app.delete('/Usuarios/:id', async (req, res) => {
    const id = req.params.id
    try{
        const result = await criar(`DELETE FROM usuarios WHERE id = ${id}`)
        res.status(201).json({msg: "Operação feita com sucesso"})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})




app.post('/Tarefas/', async (req, res) =>{
    const {nome, descricao, respon} = req.body
    try{
        const result = await criar(`INSERT INTO tarefas(nome, descricao, responsavel) VALUES (?, ?, ?)`, [ nome, descricao, respon])
        res.status(201).json({msg: "Operação feita com sucesso"})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})

app.get('/Tarefas', async (req, res) =>{
    try{
        const result = await ler(`SELECT * FROM tarefas`)
        console.log(result)
        res.send(result)
        res.status(201).json({msg: "Operação feita com sucesso"})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})

app.get('/Tarefas/:id', async (req, res) => {
    const id = req.params.id
    try{
        const result = await ler(`SELECT * FROM tarefas WHERE id = ${id}`)
        res.status(201).json({msg: `Operação feita com sucesso`, dado: result})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})

app.put('/Tarefas/:id', async (req, res) => {
    const id = req.params.id
    const {nome, descricao, responsavel} = req.body
    try{
        const result = await criar(`UPDATE tarefas SET nome = ?, descricao = ?, responsavel = ? WHERE id = ${id}`,[nome, descricao, responsavel])
        res.status(201).json({msg: "Operação feita com sucesso"})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})

app.delete('/Tarefas/:id', async (req, res) => {
    const id = req.params.id
    try{
        const result = await criar(`DELETE FROM tarefas WHERE id = ${id}`)
        res.status(201).json({msg: "Operação feita com sucesso"})
    }catch(err){
        res.status(500).json({msg: `${err}`})
    }
})


app.listen(PORT, () => { console.log(`Servidor online na porta ${PORT}`) })