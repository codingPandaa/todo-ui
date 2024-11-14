import React, { useEffect, useState } from "react";
import { createTodo, getTodoById, updateTodo } from "../services/api";
import { useNavigate, useParams } from "react-router-dom";

const AddTodo = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState("");
  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    if (id) {
      getTodoData();
    }
  }, []);

  const getTodoData = async () => {
    let response = await getTodoById(id);
    setTitle(response.data.title);
    setDescription(response.data.description);
    setCompleted(response.data.completed);
  };

  const pageTitle = () => {
    if (id) {
      return <h2 className="text-center">Update Todo</h2>;
    } else {
      return <h2 className="text-center">Add Todo</h2>;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const todo = { title, description, completed };

    if (id) {
      await updateTodo(todo, id);
      navigate("/todos");
    } else {
      await createTodo(todo);
      navigate("/todos");
    }
  };

  return (
    <div className="container">
      <br /> <br />
      <div className="row">
        <div className="card col-md-6 offset-md-3 offset-md-3">
          {pageTitle()}
          <div className="card-body">
            <form>
              <div className="form-group mb-2">
                <label className="form-label">Todo Title:</label>
                <input
                  type="text"
                  placeholder="Enter Todo Title"
                  name="title"
                  className="form-control"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                ></input>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Todo Description:</label>
                <input
                  type="text"
                  placeholder="Enter Todo Description"
                  name="description"
                  className="form-control"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                ></input>
              </div>
              <div className="form-group mb-2">
                <label className="form-label">Todo Completed:</label>
                <select
                  className="form-control"
                  value={completed}
                  onChange={(e) => setCompleted(e.target.value)}
                >
                  <option value="">select</option>
                  <option value="false">No</option>
                  <option value="true">Yes</option>
                </select>
              </div>
              <button
                className="btn btn-success"
                onClick={(e) => handleSubmit(e)}
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddTodo;
