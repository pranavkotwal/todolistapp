import React, { useState } from 'react';
import useTodoAPI from '../hooks/index';
import TodoItem from './TodoItem';
import { ToastContainer, toast } from 'react-toastify';
import styles from '../styles/TodoList.module.css'

const TodoList = () => {
  const { todos, loading, addTodo, updateTodo, deleteTodo } = useTodoAPI();
  const [newTodo, setNewTodo] = useState('');

  const handleAddTodo = async () => {
    if (newTodo.trim() === '') {
      return;
    }

    try {
      await addTodo(newTodo);
      setNewTodo('');
      toast.success('Todo added successfully');
     
    } catch (error) {
      console.log(error);
      toast.error('Failed to add todo');
    }
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.heading}>Todo List</h1>

      <div className={styles.inputContainer}>
        <input
          type="text"
          className={styles.todoInput}
          value={newTodo}
          onChange={(e) => setNewTodo(e.target.value)}
          placeholder="Enter a new todo"
        />
        <button className={styles.todoButton} onClick={handleAddTodo}>
          Add
        </button>
      </div>

      <ul className={styles.todoList}>
        {todos.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            updateTodo={updateTodo}
            deleteTodo={deleteTodo}
            toast={toast}
          />
        ))}
      </ul>

      <ToastContainer />
    </div>
  );
};

export default TodoList;
