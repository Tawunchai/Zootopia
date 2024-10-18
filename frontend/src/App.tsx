import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import NavbarUser from "./component/user/NavbarUser"
const App = () => {
  return (
    <Router>
    <Routes>
      <Route path="/" element={<NavbarUser/>} />
    </Routes>
  </Router>
  )
}

export default App
