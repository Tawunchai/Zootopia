// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./component/zookeeper/sidebar";
import Animal from "./page/Zookeeper/animals/animal";
import Event from "./page/Zookeeper/event/event";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Animal />} />
            <Route path="/event" element={<Event />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
