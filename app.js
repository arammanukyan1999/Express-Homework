const express = require('express');
const http = require('http');
const pug = require('pug');
const bodyParser = require('body-parser');
const app = express();
app.set('view engine', 'pug');
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json())
const arr = [
    {
        todo:'do Homeworks',
        id:1
    },
    {
        todo:'clean room',
        id:2
    }
]

app.get('/', function (req, res) {
    res.render('home' ,{
        todo: arr})
  })

app.post('/', (req, res) => {
    if (req.body.name != ''){
    arr.push({ todo: req.body.name ,id: arr.length + 1});
    res.redirect('/')};
});



app.get("/delete/:id",(req, res) =>{
    const {id} = req.params;
    let index = -1;
    for (let i = 0;i < arr.length;i++){
    if (arr[i].id == id){
        index = i;
        break;
    }
}
if (index >= 0) {
    arr.splice(index, 1);
    res.redirect('/');
}
res.render('home', {
    todo: arr
});
});

app.get('/edit/:id', (req, res) => {
    const { id } = req.params;
    const todo = arr.find(todo => todo.id === +id);
    if (todo) {
        res.render('edit', { todo: todo });
    } else {
        res.redirect('/');
    }
  })

  app.post('/edit/:id', (req, res) => {
    const { id } = req.params;
    const todo = arr.find(todo => todo.id === +id);
    if (todo) {
        todo.todo = req.body.todo;
    }    
        res.redirect('/');

});
 

  app.listen(9000);