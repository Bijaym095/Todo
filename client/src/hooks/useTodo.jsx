import { useEffect, useState } from "react"
import { addTodo, deleteTodo, getTodos, updateTodo } from "../services/todo";

const useTodo = () => {
  const [todos, setTodos] = useState([]);
  const [refetchTodo, setRefetchTodo] = useState(false);

  const handleAdd = async (data) => {
    try {
      await addTodo(data);
      setRefetchTodo(true);
    } catch (error) {
      console.error (`Error while deleting todo task ${error.message}`)
    }
  }

  const handleEdit = async (id, data) => {
    try {
      await updateTodo(id, data);
      setRefetchTodo(true);
    } catch (error) {
      console.error (`Error while editing todo task ${error.message}`)
    }
  }
  
  const handleDelete = async(id) => {
    try {
      await deleteTodo(id);
      setRefetchTodo(true);
    } catch (error) {
      console.error (`Error while deleting todo task ${error.message}`);
    }
  }

  useEffect(() => {
    const fetchTodos = async () => {
      try {
        const { data } = await getTodos();
        setTodos(data);
        setRefetchTodo(false);
      } catch (error) {
        console.error("Error fetching todos:", error); 
      }
    }
    
    fetchTodos()
  }, [refetchTodo]);

  return {todos, handleAdd, handleEdit, handleDelete};
}

export default useTodo;