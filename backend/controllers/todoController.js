import Todo from '../models/Todo.js';

// GET all todos (only for current user)
const getTodos = async (req, res) => {
  try {
    const todos = await Todo.find({ user: req.user });  // Filter by req.user from JWT
    res.json(todos);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// POST new todo
const createTodo = async (req, res) => {
  const { text } = req.body;
  try {
    if (!text) return res.status(400).json({ message: 'Text is required' });
    const newTodo = new Todo({ text, user: req.user });  // Add user ID
    await newTodo.save();
    res.status(201).json(newTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// PUT update todo (check if belongs to user)
const updateTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    if (todo.user.toString() !== req.user) return res.status(401).json({ message: 'Not authorized' });

    const updatedTodo = await Todo.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedTodo);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

// DELETE todo (check ownership)
const deleteTodo = async (req, res) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) return res.status(404).json({ message: 'Todo not found' });
    if (todo.user.toString() !== req.user) return res.status(401).json({ message: 'Not authorized' });

    await Todo.findByIdAndDelete(req.params.id);
    res.json({ message: 'Todo deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export { getTodos, createTodo, updateTodo, deleteTodo };