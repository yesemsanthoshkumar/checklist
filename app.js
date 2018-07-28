const express = require('express');
const app = express();
const bodyparser = require('body-parser');
const cors = require('cors');

const homeRouter = require('./routes/home');
const checklistRouter = require('./routes/checklists')

app.use(cors());

app.get('/', (req, res)=>{
    res.send("Hello World!")
})

app.use(bodyparser.json())
app.use('/home', homeRouter);
app.use('/checklists', checklistRouter);

app.listen(15000, '127.0.0.1', ()=>{
    console.log('App running on 15000')
});
