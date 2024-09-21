const express = require('express');
const app = express();
const PORT = 3000;

let todos = []; // In-memory array to store todo items

// Middleware to parse incoming request bodies (for form data)
app.use(express.urlencoded({ extended: true }));

// Route to display the todo list and the form to add new items
app.get('/', (req, res) => {
    let todoItems = todos.map((todo, index) => `<li>${todo} <a href="/delete/${index}">Delete</a></li>`).join('');
    let html = `
        <h1>Todo List</h1>
        <ul>${todoItems}</ul>
        <form method="POST" action="/add">
            <input type="text" name="todo" placeholder="Enter a new todo" required>
            <button type="submit">Add Todo</button>
        </form>
    `;
    res.send(html);
});

// Route to handle adding new todo items
app.post('/add', (req, res) => {
    let newTodo = req.body.todo;
    todos.push(newTodo);
    res.redirect('/');
});

// Route to delete a todo item by index
app.get('/delete/:id', (req, res) => {
    let id = req.params.id;
    todos.splice(id, 1); // Remove the item at the given index
    res.redirect('/');
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});