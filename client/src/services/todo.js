import axios from "axios";

export const getTodos = () => (axios.get("http://localhost:5000/api/todos/"))

export const addTodo = (data) => (axios.post("http://localhost:5000/api/todos", data))

export const getSingleTodo = (id) => (axios.get(`http://localhost:5000/api/todos/${id}`))

export const updateTodo = (id, data) => (axios.put(`http://localhost:5000/api/todos/${id}`, data))

export const deleteTodo = (id) => (axios.delete(`http://localhost:5000/api/todos/${id}`))
