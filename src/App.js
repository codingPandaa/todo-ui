import "./App.css";
import AddTodo from "./components/AddTodo";
import Footer from "./components/Footer";
import Header from "./components/Header";
import ListTodoComponent from "./components/ListTodoComponent";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Login from "./components/Login";
import { isUserLoggedIn } from "./services/utility";

function App() {
  // to avoid unathorized access to todo, addTodo and updateTodo pages
  function AuthenticatedRoute({ children }) {
    const isAuth = isUserLoggedIn();

    if (isAuth) {
      return children;
    }

    return <Navigate to="/"></Navigate>;
  }

  return (
    <>
      <BrowserRouter>
        <Header></Header>
        <Routes>
          <Route path="/" element={<Login></Login>}></Route>
          <Route
            path="/todos"
            element={
              <AuthenticatedRoute>
                <ListTodoComponent></ListTodoComponent>
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/add-todo"
            element={
              <AuthenticatedRoute>
                <AddTodo></AddTodo>
              </AuthenticatedRoute>
            }
          ></Route>
          <Route
            path="/update-todo/:id"
            element={
              <AuthenticatedRoute>
                <AddTodo></AddTodo>
              </AuthenticatedRoute>
            }
          ></Route>
          <Route path="/register" element={<Register></Register>}></Route>
          <Route path="/login" element={<Login></Login>}></Route>
        </Routes>
        <Footer></Footer>
      </BrowserRouter>
    </>
  );
}

export default App;
