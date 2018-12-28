const { Router } = require('express');

const routes = Router();

const todos = [{ todo: 'do Homeworks', id: 1 },{todo: 'clean room', id:2}]

routes.get('/todos', (req, res) => {
    res.json(todos);
});

routes.delete('/todos/:id' ,(req,res) =>{
    const {id} = req.params;
    let index = -1;
    for (let i = 0;i < todos.length;i++){
    if (todos[i].id == id){
        index = i;
        break;
    }
}
if (index >= 0) {
    todos.splice(index, 1);}
   
    res.end()
}

);
routes.post('/todos', (req,res) =>{
    let todoitem = { todo: req.body.todo ,id: todos.length + 1}
    if (req.body.todo != ''){
        todos.push(todoitem);
        return res.status(201).json(todoitem);
    };
    
    return res.status(400).end()
}); 

routes.put('/todos/:id',(req,res) => {
    const { id } = req.params;
    const todo = todos.find(todo => todo.id === +id);
    if (todo) {
        todo.todo = req.body.todo;
        return res.status(200).end()
    }
    return res.status(400).end()
   
}
)



module.exports = routes;