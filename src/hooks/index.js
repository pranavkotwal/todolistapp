import { useState, useEffect } from 'react';

const useTodoAPI = () => {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);
  
  // console.log(todos)

  useEffect(() => {
    fetchTodos();
    
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos');
      const data = await response.json();
      setTodos(data);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async (newTodo) => {
    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title: newTodo,
          completed: false
        })
      });
      const data = await response.json();
      //new todo will be added on top
      setTodos([data,...todos]);
    } catch (error) {
      console.log(error);
    }
  };

  const updateTodo = async (id, updatedTodo) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(updatedTodo)
      });
      const updatedTodos = todos.map(todo => (todo.id === id ? { ...todo, ...updatedTodo } : todo));
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTodo = async (id) => {
    try {
      await fetch(`https://jsonplaceholder.typicode.com/todos/${id}`, {
        method: 'DELETE'
      });
      const updatedTodos = todos.filter(todo => todo.id !== id);
      setTodos(updatedTodos);
    } catch (error) {
      console.log(error);
    }
  };

  return { todos, loading, addTodo, updateTodo, deleteTodo };
};

export default useTodoAPI;
