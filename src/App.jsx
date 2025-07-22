import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Parent from "./components/Parent/Parent";
import Counter from "./components/counter/counter";
import TodoList from "./components/TodoList/TodoList";
import RegForm from "./components/RegForm/regform";
import NewButton from "./components/NewButton"; // Note lowercase folder name

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Parent />} />
        <Route path="/counter" element={<Counter />} />
        <Route path="/todo" element={<TodoList />} />
        <Route path="/register" element={<RegForm />} />
        <Route path="/dashboard" element={<NewButton />} />
      </Routes>
    </Router>
  );
}

export default App;
