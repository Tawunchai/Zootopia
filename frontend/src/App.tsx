// src/App.js
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Sidebar from "./component/zookeeper/sidebar";
import Animal from "./page/Zookeeper/animals/animal";
import Event from "./page/Zookeeper/event/event";
import Calendar from "./page/Zookeeper/calendar/calendar";
import Habitat from "./page/Zookeeper/habitat/habitat";
import Work from "./page/Zookeeper/work/work";
import Report from "./page/Zookeeper/report/report";

function App() {
  return (
    <Router>
      <div className="flex">
        <Sidebar />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Animal />} />
            <Route path="/event" element={<Event />} />
            <Route path="/habitat" element={<Habitat />} />
            <Route path="/calendar" element={<Calendar />} />
            <Route path="/report" element={<Report />} />
            <Route path="/work" element={<Work />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;
