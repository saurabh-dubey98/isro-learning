import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { Provider } from 'react-redux';
import { store } from './slices/store';
import Home from './components/Home/Home';
import MCQ from './components/MCQ/MCQ';
import Centres from './components/Centres/Centres';
import CustomerSatellites from './components/CustomerSatellites/CustomerSatellites';
import Launchers from './components/Launchers/Launchers';
import SpaceCrafts from './components/SpaceCrafts/SpaceCrafts';
import Certificate from './components/Certificate/Certificate';
import Login from './components/Auth/Login';
import Register from './components/Auth/Register';
import './App.css';

function App() {
  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='/' element={<Home />} />
          <Route path='/mcq/:id' element={<MCQ />} />
          <Route path='/centres' element={<Centres />} />
          <Route path='/customer-satellites' element={<CustomerSatellites />} />
          <Route path='/launchers' element={<Launchers />} />
          <Route path='/spacecrafts' element={<SpaceCrafts />} />
          <Route path='/certificate' element={<Certificate />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
