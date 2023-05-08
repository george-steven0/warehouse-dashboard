import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Pages/home';
import IndividualSellerInfo from './Pages/individualSellerInfo';
import Sales from './Pages/sales';
import Sellers from './Pages/sellers';
import SellersInfo from './Pages/sellersInfo';
import Reports from './Pages/reports';
import ReportDetails from './Pages/reportDetails';
import axios from 'axios';
import Login from './Pages/login';
import { useSelector } from 'react-redux';


function App() {
  const data = useSelector(state=>state.login)
  const token = localStorage.getItem('acTK')

  axios.defaults.baseURL ="https://marketplacebackend.pythonanywhere.com"
  axios.defaults.headers.post['Content-Type'] = 'application/json';
  axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;

  return (
    <div className="Dashboard">

      <BrowserRouter>
        <Routes>
          <Route path='/' exact element={<Home />} />
          <Route path='/login' exact element={<Login />} />
          <Route path='/Sales' exact element={<Sales />} />
          <Route path='/Sellers' exact element={<Sellers />} />
          <Route path='/SellersInfo' exact element={<SellersInfo />} />
          <Route path='/SellersInfo/IndividualSellerInfo' exact element={<IndividualSellerInfo />} />
          <Route path='/Reports' exact element={<Reports />} />
          <Route path='/Reports/ReportDetails' exact element={<ReportDetails />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
