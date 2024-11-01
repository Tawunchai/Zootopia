import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import AnimalDetails from "./page/Zookeeper/animals/animal"
import CreateAnimal from "./page/Zookeeper/animals/create"
import NavbarZookeeper from './component/zookeeper/NavbarZookeeper';
const App = () => {
  return (
    <Router>
      <NavbarZookeeper/>
    <Routes>
      <Route path="/" element={<AnimalDetails/>} />
      <Route path="/create" element={<CreateAnimal/>} />
    </Routes>
  </Router>
  )
}

export default App
