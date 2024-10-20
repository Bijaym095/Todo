import Todo from "../models/todoModel.js";

// @desc    Get all todos
// @route   GET /api/todos
// @access  Public
export const getTodos = async (req, res, next) => {
  try {
    const todos = await Todo.find();
    res.status(200).json(todos);
  } catch (err) {
    next(err);
  }
};

// @desc    Get a single todo
// @route   GET /api/todos/:id
// @access  Public
export const getTodoById = async (req, res, next) => {
  try {
    const todo = await Todo.findById(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }
    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};

// @desc    Create a new todo
// @route   POST /api/todos
// @access  Public
export const createTodo = async (req, res, next) => {
  const { title, description, completed } = req.body;

  try {
    const newTodo = new Todo({
      title,
      description,
      completed: completed || false,
    });

    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
  } catch (err) {
    next(err);
  }
};

// @desc    Update a todo
// @route   PUT /api/todos/:id
// @access  Public
export const updateTodo = async (req, res, next) => {
  const { params: { id }, body } =  req;
  try {
    const todo = await Todo.findByIdAndUpdate(id, body, {
      returnDocument: "after",
    });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json(todo);
  } catch (err) {
    next(err);
  }
};

// @desc    Delete a todo
// @route   DELETE /api/todos/:id
// @access  Public
export const deleteTodo = async (req, res, next) => {
  try {
    const todo = await Todo.findByIdAndDelete(req.params.id);
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(204).json({message: "Todo removed successfully" });
  } catch (err) {
    next(err);
  }
};
