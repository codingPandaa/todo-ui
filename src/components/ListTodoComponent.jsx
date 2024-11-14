import React, { useEffect, useState } from "react";
import {
  completeTodo,
  deleteTodo,
  getAllTodos,
  incompleteTodo,
} from "../services/api";
import { useNavigate } from "react-router-dom";
import { isAdminUser } from "../services/utility";

const ListTodoComponent = () => {
  const [todos, setTodos] = useState([]);
  const naviagte = useNavigate();

  const isAdmin = isAdminUser();

  useEffect(() => {
    getTodoDetails();
  }, []);

  const getTodoDetails = async () => {
    let response = await getAllTodos();
    setTodos(response.data);
  };

  const handleAdd = () => {
    naviagte("/add-todo");
  };

  const updateTodo = (id) => {
    naviagte(`/update-todo/${id}`);
  };

  const handleDelete = async (id) => {
    await deleteTodo(id);
    getTodoDetails();
  };

  const handleComplete = async (id) => {
    await completeTodo(id);
    getTodoDetails();
  };

  const handleIncomplete = async (id) => {
    await incompleteTodo(id);
    getTodoDetails();
  };

  return (
    <div className="container">
      <h2 className="text-center">List of Todos</h2>
      {isAdmin && (
        <button className="btn btn-primary mb-2" onClick={handleAdd}>
          Add Todo
        </button>
      )}
      <div>
        <table className="table table-bordered table-striped">
          <thead>
            <tr>
              <th>Todo Title</th>
              <th>Todo Discription</th>
              <th>Todo Completed</th>
            </tr>
          </thead>
          <tbody>
            {todos.map((todo) => (
              <tr key={todo.id}>
                <td>{todo.title}</td>
                <td>{todo.description}</td>
                <td>{todo.completed ? "YES" : "NO"}</td>
                <td>
                  {isAdmin && (
                    <button
                      className="btn btn-info"
                      onClick={() => updateTodo(todo.id)}
                    >
                      Update
                    </button>
                  )}
                </td>
                <td>
                  {isAdmin && (
                    <button
                      className="btn btn-danger"
                      onClick={() => handleDelete(todo.id)}
                    >
                      Delete
                    </button>
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-success"
                    onClick={() => handleComplete(todo.id)}
                  >
                    Complete
                  </button>
                </td>
                <td>
                  <button
                    className="btn btn-info"
                    onClick={() => handleIncomplete(todo.id)}
                  >
                    In Complete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ListTodoComponent;
