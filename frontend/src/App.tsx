import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarUser from "./component/user/NavbarUser"
import AnimalDetails from "./page/animals/animal"
const App = () => {
  return (
    <Router>
      <NavbarUser/>
    <Routes>
      <Route path="/" element={<AnimalDetails/>} />
    </Routes>
  </Router>
  )
}

export default App
