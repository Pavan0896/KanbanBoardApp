import "./App.css";
import { Route, Routes } from "react-router-dom";
import Register from "./Components/Register";
import Login from "./Components/Login";
import Navbar from "./Components/Navbar";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";
import TodoBoard from "./Components/TodoBoard";
import CreateTodo from "./Components/CreateTodo";
import PrivateRoute from "./Components/PrivateRoute";

function App() {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route
          path="/kanban-board"
          element={
            <PrivateRoute>
              <DndProvider backend={HTML5Backend}>
                <TodoBoard />
              </DndProvider>
            </PrivateRoute>
          }
        />
        <Route path="/createTodo" element={<CreateTodo />} />
      </Routes>
    </>
  );
}

export default App;
