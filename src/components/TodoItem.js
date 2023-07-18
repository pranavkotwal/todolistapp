import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../styles/TodoList.module.css';

// the props are going to come from todoList 
const TodoItem = ({ todo, updateTodo, deleteTodo, toast }) => {
  const [editing, setEditing] = useState(false);
  const [updatedTitle, setUpdatedTitle] = useState(todo.title);

  // handle checkbox change
  const handleCheckboxChange = (e) => {
    updateTodo(todo.id, { completed: e.target.checked });
  };
  // handle delete button 

  const handleDelete = async () => {
    try {
      await deleteTodo(todo.id);
      toast.success('Todo deleted successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to delete todo');
    }
  };
  // handle update onKeydown function
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleUpdate();
    }
  };

  const handleUpdate = async () => {
    if (updatedTitle.trim() === '') {
      // Don't update if the title is empty
      return;
    }

    try {
      await updateTodo(todo.id, { title: updatedTitle });
      setEditing(false);
      toast.success('Todo updated successfully');
    } catch (error) {
      console.log(error);
      toast.error('Failed to update todo');
    }
  };

  return (

    <li className={styles.todoItem}>
      
        <input
          type="checkbox"
          checked={todo.completed}
          onChange={handleCheckboxChange}
        />
        

        {editing ? (
           // Input field for editing todo title
          <input
            type="text"
            value={updatedTitle}
            onChange={(e) => setUpdatedTitle(e.target.value)}
            onKeyDown={handleKeyDown}
            className={styles.todoText}
          />
        ) : (
          <span>{todo.title}</span>
        )}
        <div className={styles.todoButtons}>
        {!editing && (
          <>
            <button
              className={`${styles.todoButton} ${styles.updateButton}`}
              onClick={() => setEditing(true)}
            >
              Update
            </button>
            
            
            <button
              className={`${styles.todoButton} ${styles.deleteButton}`}
              onClick={handleDelete}
            >

              Delete
            </button>
            
          </>
        )}
      </div>
    </li>
  );
};

TodoItem.propTypes = {
  todo: PropTypes.object.isRequired,
  updateTodo: PropTypes.func.isRequired,
  deleteTodo: PropTypes.func.isRequired,
  toast: PropTypes.func.isRequired
};

export default TodoItem;
