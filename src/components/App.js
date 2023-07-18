import React from 'react';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import TodoList from './TodoList';

const App = () => {
  return (
    <div>
      <TodoList/>
      <ToastContainer />
      
    </div>
  );
};

export default App;
